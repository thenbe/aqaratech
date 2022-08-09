import {
  GetObjectCommand,
  GetObjectCommandInput,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentConfig } from 'src/interfaces/environment.interface';

@Injectable()
export class S3Service {
  constructor(readonly configService: ConfigService<EnvironmentConfig>) {
    const accountId = configService.get('r2Config.R2_ACCOUNT_ID', {
      infer: true,
    });

    const accessKeyId = configService.get('r2Config.R2_ACCESS_KEY_ID', {
      infer: true,
    });

    const secretAccessKey = configService.get('r2Config.R2_SECRET_ACCESS_KEY', {
      infer: true,
    });

    // TODO use class validator?
    // https://docs.nestjs.com/techniques/configuration#configuration
    if (!accountId || !accessKeyId || !secretAccessKey) {
      throw new Error('R2 config not found');
    }

    this._client = new S3Client({
      region: 'auto',
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  private _client: S3Client;
  private readonly _bucket = 'bucket-test-1';

  async putObject(params: Omit<PutObjectCommandInput, 'Bucket'>) {
    const uploaded = await this._client.send(
      new PutObjectCommand({
        ...params,
        Bucket: this._bucket,
      }),
    );
    console.log(uploaded);
  }

  async listObjects() {
    const objects = await this._client.send(
      new ListObjectsV2Command({
        Bucket: this._bucket,
      }),
    );
    console.log(objects);
    return objects;
  }

  async getObject(params: Omit<GetObjectCommandInput, 'Bucket'>) {
    return this._client.send(
      new GetObjectCommand({
        ...params,
        Bucket: this._bucket,
      }),
    );
  }
}
