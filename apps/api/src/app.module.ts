import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { env, envSchema } from 'env.config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from 'libs/mail/mail.module';
import { HttpExceptionFilter } from './common/filters/exception.filter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { MinioModule } from 'libs/minio/minio.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => {
        return envSchema.parse(config);
      },
    }),
    EventEmitterModule.forRoot(),
    MailModule.forRoot({
      transport: {
        host: env.SMTP_SERVER,
        port: env.SMTP_PORT,
        secure: env.SMTP_SSL,
        auth: {
          user: env.SMTP_USERNAME,
          pass: env.SMTP_PASSWORD,
        },
      },
      defaultFrom: {
        name: env.PROJECT_TITLE,
        address: env.SMTP_USERNAME,
      },
      options: {
        logger: new Logger(MailModule.name),
      },
    }),
    MinioModule.forRoot({
      endPoint: env.MINIO_HOST,
      accessKey: env.MINIO_ACCESS_KEY,
      secretKey: env.MINIO_SECRET_KEY,
      bucketName: env.MINIO_DEFAULT_BUCKET,
      port: env.MINIO_PORT,
      useSSL: env.MINIO_SSL,
      region: env.MINIO_DEFAULT_REGION,
    }),
    EventsModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    OrganisationsModule,
    JobsModule,
  ],
  controllers: [],
  providers: [HttpExceptionFilter],
})
export class AppModule {}
