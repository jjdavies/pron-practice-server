import { Module } from '@nestjs/common';
import { ActivityGroupEntity } from './activitygroup.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityGroupEntity, ActivityEntity])],
  providers: [ActivityService],
  controllers: [ActivityController],
  exports:[ActivityService]
})
export class ActivityModule {}
