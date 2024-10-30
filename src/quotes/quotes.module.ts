import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';

@Module({
  imports: [ConfigModule],
  controllers: [QuotesController],
  providers: [QuotesService],
})
export class QuotesModule {}
