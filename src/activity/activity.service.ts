import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { ActivityGroupEntity } from './activitygroup.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
  ) {}

  async createActivityGroup(uuid: string): Promise<ActivityGroupEntity> {
    const activityGroupEntity: ActivityGroupEntity = new ActivityGroupEntity();
    activityGroupEntity.uuid = uuid;
    return activityGroupEntity;
  }
}
