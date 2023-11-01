import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { OptionService } from './option.service';
import { v4 as uuidv4 } from 'uuid';
import { OptionDto } from '../dto/option.dto';
import { GetMultiOptionsDto } from 'src/dto/getMultiOptions.dto';

@Controller('option')
export class OptionController {
  constructor(private optionService: OptionService) {}

  // getUUID(): string {
  //   return uuidv4();
  // }

  @Get('/:optionid')
  async getOption(@Param('optionid') optionid: string) {
    return this.optionService.getOption(optionid);
  }

  @Get('new/:count')
  async setMultiOptions(@Param('count') count: number) {
    // const uuids = [uuidv4(), uuidv4()];
    const uuids = Array(+count)
      .fill(+count)
      .map(() => uuidv4());
    return await this.optionService.setMultiOptions(uuids);
  }

  @Post('/multi')
  async getMultiOptions(@Body() getMultiOptionsDto: GetMultiOptionsDto) {
    // console.log('hit post multi', getMultiOptionsDto);
    return await this.optionService.getMultiOptions(getMultiOptionsDto);
  }

  @Post()
  async setOption(@Body() optionDto: OptionDto) {
    // optionDto.uuid = optionDto.uuid !== undefined ? optionDto.uuid : uuidv4();
    // optionDto.preceding =
    //   optionDto.preceding !== undefined ? optionDto.preceding : '';
    // optionDto.fileuuid =
    //   optionDto.fileuuid !== undefined ? optionDto.fileuuid : '';
    // optionDto.correct =
    //   optionDto.correct !== undefined ? optionDto.correct : false;
    return this.optionService.setOption(optionDto);
  }
}
