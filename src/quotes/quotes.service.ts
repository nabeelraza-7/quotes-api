import { Injectable } from '@nestjs/common';

@Injectable()
export class QuotesService {
  private quotes: string[] = [];

  constructor() {
    this.quotes = [
      'The only limit to our realization of tomorrow is our doubts of today.',
      'The purpose of our lives is to be happy.',
      "Life is what happens when you're busy making other plans.",
      'Get busy living or get busy dying.',
      'You have within you right now, everything you need to deal with whatever the world can throw at you.',
      'The best way to predict the future is to invent it.',
      'Life is 10% what happens to us and 90% how we react to it.',
      'The only way to do great work is to love what you do.',
      'Success is not the key to happiness. Happiness is the key to success.',
      'Your time is limited, so don’t waste it living someone else’s life.',
    ];
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
