import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuotesModule } from './quotes/quotes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    QuotesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
