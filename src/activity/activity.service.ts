import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityDto } from 'src/dto/activity.dto';
import { Repository, In } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { OptionEntity } from '../option/option.entity';
import { ActivityGroupEntity } from './activitygroup.entity';
import { FileEntity } from 'src/file/file.entity';
import { ActivityGroupDto } from 'src/dto/activitygroup.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityGroupEntity)
    private activityGroupRepository: Repository<ActivityGroupEntity>,
    @InjectRepository(ActivityEntity)
    private activityRepository: Repository<ActivityEntity>,
    @InjectRepository(OptionEntity)
    private optionsRepository: Repository<OptionEntity>,
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async deleteGroup(uuid: string) {
    const group = await this.activityGroupRepository.findOne({
      where: { uuid: uuid },
    });
    group.deleted = true;
    return await this.activityGroupRepository.upsert([group], ['uuid']);
  }

  async clearAllActivityData() {
    const allActivityGroups = await this.activityGroupRepository.find();
    await this.activityGroupRepository.remove(allActivityGroups);
    const allActivities = await this.activityRepository.find();
    await this.activityRepository.remove(allActivities);
    const allFiles = await this.fileRepository.find();
    await this.fileRepository.remove(allFiles);
  }

  async getAllGroups(): Promise<ActivityGroupEntity[]> {
    return await this.activityGroupRepository.find();
  }

  async getActivity(uuid: string): Promise<ActivityEntity> {
    return await this.activityRepository.findOne({ where: { uuid: uuid } });
  }

  async getAllGroupActivities(uuid: string): Promise<ActivityEntity[]> {
    const activitiesIDs = (
      await this.activityGroupRepository.findOne({
        where: { uuid: uuid },
      })
    ).activities;

    return await this.activityRepository.find({
      where: { uuid: In(activitiesIDs) },
    });
  }

  async createActivityGroup(uuid: string): Promise<ActivityGroupEntity> {
    const activityGroupEntity: ActivityGroupEntity = new ActivityGroupEntity();
    activityGroupEntity.uuid = uuid;
    activityGroupEntity.title = '';
    activityGroupEntity.activities = [];
    activityGroupEntity.deleted = false;
    await this.activityGroupRepository.save(activityGroupEntity);
    return activityGroupEntity;
  }

  async setActivityGroup(activityGroupDto: ActivityGroupDto) {
    //check to see if an activity group uuid is supplied
    //if supplied edit existing uuid to change the supplied fields
    //if not supplied, add a uuid and add blank fields to undefined fields

    if (activityGroupDto.uuid !== undefined) {
      //edit supplied fields
      //get the existing group and alter the defined fields before saving
      const activityGroup = await this.activityGroupRepository.findOne({
        where: { uuid: activityGroupDto.uuid },
      });
      activityGroup.title =
        activityGroupDto.title !== undefined
          ? activityGroupDto.title
          : activityGroup.title;
      activityGroup.activities =
        activityGroupDto.activities !== undefined
          ? activityGroupDto.activities
          : activityGroup.activities;
      activityGroup.thumb =
        activityGroupDto.thumb !== undefined
          ? activityGroupDto.thumb
          : activityGroup.thumb;
      activityGroup.deleted =
        activityGroupDto.deleted !== undefined
          ? activityGroupDto.deleted
          : activityGroup.deleted;
      await this.activityGroupRepository.upsert([activityGroup], ['uuid']);
      return activityGroup;
    }
    const activityGroupEntity = new ActivityGroupEntity();
    activityGroupEntity.uuid = uuidv4();
    activityGroupEntity.title =
      activityGroupDto.title !== undefined ? activityGroupDto.title : '';
    activityGroupEntity.thumb =
      activityGroupDto.thumb !== undefined ? activityGroupDto.thumb : '';
    activityGroupEntity.activities =
      activityGroupDto.activities !== undefined
        ? activityGroupDto.activities
        : [];
    activityGroupEntity.deleted =
      activityGroupDto.deleted !== undefined ? activityGroupDto.deleted : false;
    return await this.activityGroupRepository.save(activityGroupEntity);
  }

  async setActivity(activityDto: ActivityDto): Promise<ActivityEntity> {
    //check if uuid is supplied
    if (activityDto.uuid !== undefined) {
      //edit supplied fields only
      const activity = await this.activityRepository.findOne({
        where: { uuid: activityDto.uuid },
      });
      activity.options =
        activityDto.options !== undefined
          ? activityDto.options
          : activity.options;
      activity.preceding =
        activityDto.preceding !== undefined
          ? activityDto.preceding
          : activity.preceding;
      activity.title =
        activityDto.title !== undefined ? activityDto.title : activity.title;
      activity.fileuuid =
        activityDto.fileuuid !== undefined
          ? activityDto.fileuuid
          : activity.fileuuid;
      await this.activityRepository.upsert([activity], ['uuid']);
      return activity;
    }
    console.log('new activity');
    //new activity
    const activityEntity: ActivityEntity = new ActivityEntity();
    activityEntity.uuid = uuidv4();
    activityEntity.options =
      activityDto.options !== undefined ? activityDto.options : [];
    activityEntity.preceding =
      activityDto.preceding !== undefined ? activityDto.preceding : '';
    activityEntity.title =
      activityDto.title !== undefined ? activityDto.title : '';
    activityEntity.fileuuid =
      activityDto.fileuuid !== undefined ? activityDto.fileuuid : '';
    console.log('act service entity: ', activityEntity);
    await this.activityRepository.save(activityEntity);
    //add this activity assignment to the activity group
    if (activityDto.activityGroupID === undefined) return activityEntity;
    const currentGroup = await this.activityGroupRepository.findOne({
      where: { uuid: activityDto.activityGroupID },
    });
    //check to see if one completed activity is present
    //if present make thumb
    console.log(currentGroup.thumb);
    if (currentGroup.thumb !== '') {
      return activityEntity;
    }
    if (currentGroup.activities.length === 0) {
      return activityEntity;
    }
    //get the first activity
    const firstActivity = await this.activityRepository.findOne({
      where: { uuid: currentGroup.activities[0] },
    });
    if (firstActivity.options.length === 0) return activityEntity;
    //get the options of the first activity
    const options = this.optionsRepository.find({
      where: { uuid: In(firstActivity.options) },
    });

    await this.activityGroupRepository.update(
      { uuid: activityDto.activityGroupID },
      {
        activities: [...currentGroup.activities, activityEntity.uuid],
        thumb: options[0].fileuuid,
      },
    );

    // return activityEntity;
  }
}
