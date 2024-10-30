import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class QuotesService {
  private quotes: string[] = [];
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY') || '',
      },
    });
  }

  async onModuleInit() {
    await this.loadQuotesFromS3();
  }

  private async loadQuotesFromS3() {
    try {
      const bucketName = this.configService.get('S3_BUCKET_NAME');
      const objectKey = this.configService.get('OBJECT_KEY');

      console.log('Loading quotes from S3...', bucketName, objectKey);

      const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: objectKey,
      });

      const response = await this.s3Client.send(command);
      const fileContent = await response.Body?.transformToString();

      if (fileContent) {
        this.quotes = JSON.parse(fileContent).quotes;
      } else {
        this.quotes = [];
      }
    } catch (error) {
      console.error('Error loading quotes from S3:', error);
      this.quotes = [];
    }
  }

  findAll() {
    return this.quotes;
  }

  findRandomQuote() {
    const randomIndex = Math.floor(Math.random() * this.quotes.length);
    return this.quotes[randomIndex];
  }

  findOne(id: number) {
    if (id >= 0 && id < this.quotes.length) {
      return this.quotes[id];
    } else {
      return 'Quote not found';
    }
  }
}
