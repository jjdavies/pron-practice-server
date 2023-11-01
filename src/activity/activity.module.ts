import { Module } from '@nestjs/common';
import { ActivityGroupEntity } from './activitygroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { FileEntity } from 'src/file/file.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { OptionEntity } from 'src/option/option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityGroupEntity,
      ActivityEntity,
      FileEntity,
      OptionEntity,
    ]),
  ],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports: [ActivityService],
})
export class ActivityModule {}
