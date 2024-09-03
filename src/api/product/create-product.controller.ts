import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class CreateProductController {
  @Post()
  async execute(@Body() body: unknown) {
    console.log(body);
  }
}
