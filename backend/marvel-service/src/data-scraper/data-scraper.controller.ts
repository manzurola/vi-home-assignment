import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DataScraperService } from './data-scraper.service';

@Controller('data-scraper')
export class DataScraperController {
  constructor(private readonly dataScraperService: DataScraperService) {}

  @Get()
  getStatus() {
    return {
      message: 'Data scraper service is running',
      endpoints: ['/scrape-movies'],
    };
  }
  @Post('scrape-movies')
  @HttpCode(HttpStatus.OK)
  async scrapeMovies() {
    try {
      const result = await this.dataScraperService.scrapeAllMovies();
      return {
        success: true,
        message: 'Movies scraping completed successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error occurred during scraping',
        error: error.message,
      };
    }
  }
}
