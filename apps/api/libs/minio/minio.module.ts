import { Module, OnModuleInit } from '@nestjs/common';
import { MINIO_INSTANCE } from './minio.constants';
import * as Minio from 'minio';
import { env } from 'env.config';
import { MinioService } from './minio.service';

@Module({
  providers: [
    {
      provide: MINIO_INSTANCE,
      useFactory: () => {
        const client = new Minio.Client({
          endPoint: env.MINIO_HOST,
          port: env.MINIO_PORT,
          useSSL: env.MINIO_SSL,
          accessKey: env.MINIO_ACCESS_KEY,
          secretKey: env.MINIO_SECRET_KEY,
        });
        return client;
      },
    },
    MinioService,
  ],
  exports: [MinioService],
})
export class MinioModule implements OnModuleInit {
  constructor(private readonly minioService: MinioService) {}
  async onModuleInit() {
    await this.minioService.createBucket(
      env.MINIO_DEFAULT_BUCKET,
      env.MINIO_DEFAULT_REGION,
    );
  }
}
