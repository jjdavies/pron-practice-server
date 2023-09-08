import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityDto } from 'src/dto/activity.dto';
import { Repository, In } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { ActivityGroupEntity } from './activitygroup.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityGroupEntity)
    private activityGroupRepository: Repository<ActivityGroupEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
  ) {}

  async createActivityGroup(uuid: string): Promise<ActivityGroupEntity> {
    const activityGroupEntity: ActivityGroupEntity = new ActivityGroupEntity();
    activityGroupEntity.uuid = uuid;
    activityGroupEntity.title = '';
    activityGroupEntity.activities = [];
    // await this.activityGroupRepository.save(activityGroupEntity);
    return activityGroupEntity;
  }

  async setActivity(activityDto:ActivityDto):Promise<ActivityEntity>{
    const activityEntity:ActivityEntity = new ActivityEntity();
    activityEntity.options = activityDto.options;
    activityEntity.preceding = activityDto.preceding;
    activityEntity.title = activityDto.title;
    await this.activityRepository.save(activityDto);
    return activityEntity
  }
}