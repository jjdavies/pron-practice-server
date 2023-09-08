import { Module } from '@nestjs/common';
import { ActivityGroupEntity } from './activitygroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { OptionController } from 'src/option/option.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityGroupEntity, ActivityEntity])],
  providers: [ActivityService],
  controllers: [OptionController],
})
export class ActivityModule {}
