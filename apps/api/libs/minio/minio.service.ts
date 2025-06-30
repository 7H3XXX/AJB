import { Inject, Injectable } from '@nestjs/common';
import { MEDIA_EXTENSIONS, MINIO_INSTANCE } from './minio.constants';
import * as Minio from 'minio';
import { dataUriToBuffer } from 'data-uri-to-buffer';
import { Readable } from 'stream';
import { env } from 'env.config';
import { randomBytes } from 'crypto';
import { MinioImage } from './minio.types';

@Injectable()
export class MinioService {
  constructor(@Inject(MINIO_INSTANCE) public readonly client: Minio.Client) {}

  async createBucket(
    bucketName: string,
    region?: string,
    options?: { policy: string },
  ) {
    const exists = await this.client.bucketExists(bucketName);
    if (!exists) {
      await this.client.makeBucket(bucketName, region);
    }
    const bucketPolicy =
      options?.policy ??
      JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: '*',
            Action: 's3:GetObject',
            Resource: `arn:aws:s3:::${bucketName}/*`,
          },
        ],
      });
    await this.client.setBucketPolicy(bucketName, bucketPolicy);
  }

  async putDataUri(
    dataUri: string,
    objectName?: string,
    bucketName?: string,
    expires?: number,
  ): Promise<MinioImage> {
    const buffer = dataUriToBuffer(dataUri);
    const dataStream = new Readable();
    dataStream.push(Buffer.from(buffer.buffer));
    dataStream.push(null);

    // set nullable params
    const fileEx = MEDIA_EXTENSIONS[buffer.type];
    objectName =
      objectName ?? `blob_${randomBytes(6).toString('hex')}${fileEx || ''}`;
    bucketName = bucketName ?? env.MINIO_DEFAULT_BUCKET;

    const putResp = await this.client.putObject(
      bucketName,
      objectName,
      dataStream,
      buffer.buffer.byteLength,
      { 'Content-Type': buffer.type },
    );
    const signedUrl = await this.client.presignedGetObject(
      bucketName,
      objectName,
      expires,
    );
    const [baseUrl, params] = signedUrl.split('?');
    const signedData = new URLSearchParams(params);
    return MinioImage.parse({
      baseUrl,
      signedUrl,
      ...putResp,
      ...Object.fromEntries(signedData.entries()),
    });
  }
}
