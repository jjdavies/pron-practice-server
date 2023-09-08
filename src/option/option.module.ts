import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './option.entity';
import { OptionController } from './option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  providers: [OptionService],
  controllers: [OptionController],
})
export class OptionModule {}
