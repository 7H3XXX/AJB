import { z } from 'zod';

export const MinioImage = z.object({
  baseUrl: z.string(),
  signedUrl: z.string(),
  etag: z.string(),
  versionId: z.string().nullish(),
  'X-Amz-Algorithm': z.string(),
  'X-Amz-Credential': z.string(),
  'X-Amz-Date': z.string(),
  'X-Amz-Expires': z.string(),
  'X-Amz-SignedHeaders': z.string(),
  'X-Amz-Signature': z.string(),
});

export type MinioImage = z.infer<typeof MinioImage>;
