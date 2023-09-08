import { Controller, Get } from '@nestjs/common';
import { OptionService } from './option.service';

@Controller('option')
export class OptionController {constructor(private optionService:OptionService){}}

// @Get('multi')
// async get
// }
