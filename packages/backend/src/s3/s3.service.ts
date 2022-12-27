import {
	CreateBucketCommand,
	DeleteBucketCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	GetObjectCommandInput,
	ListObjectsV2Command,
	ListObjectsV2CommandInput,
	NoSuchBucket,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable, Logger } from '@nestjs/common';

import { S3_TTL } from 'src/constants/s3-ttl';
import { EnvService } from 'src/env/env.service';

@Injectable()
export class S3Service {
	constructor(private readonly env: EnvService) {
		const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = this.env.e;

		this._client = new S3Client({
			region: 'auto',
			endpoint: R2_ENDPOINT,
			credentials: {
				accessKeyId: R2_ACCESS_KEY_ID,
				secretAccessKey: R2_SECRET_ACCESS_KEY,
			},
		});

		// https://developers.cloudflare.com/r2/platform/s3-compatibility/extensions/#cf-create-bucket-if-missing
		this._client.middlewareStack.add(
			(next) => (args) => {
				if (
					typeof args.request === 'object' &&
					args.request &&
					'headers' in args.request &&
					'method' in args.request &&
					'query' in args.request
				) {
					const request = args.request;
					let isPutObject = false;
					if (
						request.method === 'PUT' &&
						request.query &&
						typeof request.query === 'object' &&
						'x-id' in request.query &&
						request.query['x-id'] === 'PutObject'
					) {
						isPutObject = true;
					}

					if (
						isPutObject &&
						request.headers &&
						typeof request.headers === 'object'
					) {
						const headers = request.headers as Record<string, unknown>;
						// throws SignatureDoesNotMatch error if trying to get presigned URL.
						// So only add this header if we are putting an object.
						headers['cf-create-bucket-if-missing'] = 'true';
					}
				}
				return next(args);
			},
			{ step: 'build' },
		);
	}

	private readonly _client: S3Client;
	private readonly logger = new Logger(S3Service.name);

	async putObject(params: PutObjectCommandInput) {
		this.logger.debug(`Putting object in bucket ${params.Bucket ?? ''}`);
		const uploaded = await this._client.send(
			new PutObjectCommand({
				...params,
				ContentDisposition: 'inline',
			}),
		);
		return uploaded;
	}

	async listObjects(options: ListObjectsV2CommandInput) {
		this.logger.debug(`Listing objects in bucket ${options.Bucket ?? ''}`);
		try {
			const objects = await this._client.send(
				new ListObjectsV2Command(options),
			);
			return objects;
		} catch (error) {
			if (error instanceof NoSuchBucket) {
				this.logger.debug(`No bucket found: ${options.Bucket ?? ''}`);
				return undefined;
			} else {
				this.logger.error(error);
				throw error;
			}
		}
	}

	async getObject(options: GetObjectCommandInput) {
		this.logger.debug(`Getting object in bucket ${options.Bucket ?? ''}`);
		const command = new GetObjectCommand(options);

		const url = await getSignedUrl(this._client, command, {
			expiresIn: S3_TTL,
		});
		this.logger.debug(
			`Returning signed url for Key: ${options.Key ?? ''}: - URL: ${url}`,
		);
		return url;
	}

	async removeObject(options: GetObjectCommandInput) {
		return await this._client.send(new DeleteObjectCommand(options));
	}

	async deleteBucket(bucketName: string) {
		// delete all objects in bucket
		const objects = await this.listObjects({
			Bucket: bucketName,
		});

		if (objects?.Contents) {
			await Promise.all(
				objects.Contents.map((object) =>
					this.removeObject({
						Bucket: bucketName,
						Key: object.Key,
					}),
				),
			);
		}

		// delete bucket
		const deleted = await this._client.send(
			new DeleteBucketCommand({
				Bucket: bucketName,
			}),
		);

		return deleted;
	}

	async createBucket(bucketName: string) {
		return await this._client.send(
			new CreateBucketCommand({
				Bucket: bucketName,
			}),
		);
	}
}
