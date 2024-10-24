import { Controller, Get, Param } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  findAll() {
    return this.quotesService.findAll();
  }

  @Get('random')
  findRandomQuote() {
    return this.quotesService.findRandomQuote();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }
}
