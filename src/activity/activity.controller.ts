import { Controller, Get, Param, Body, Post } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDto } from 'src/dto/activity.dto';

import { v4 as uuidv4 } from 'uuid';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Get()
  async getAllActivities() {
    return 'return all activities';
  }

  @Get(':activityid')
  async getSpecActivity(@Param('activityid') activityid: string) {
    console.log(activityid);
    return activityid;
  }
  @Post()
  async setActivity(@Body() activityDto: ActivityDto) {
    activityDto.uuid = uuidv4();
    activityDto.title =
      activityDto.title !== undefined ? activityDto.title : '';
    activityDto.audioclip =
      activityDto.audioclip !== undefined ? activityDto.audioclip : '';
    activityDto.options =
      activityDto.options !== undefined ? activityDto.options : [''];
    return activityDto;
  }
  @Get('group')
  async getAllGroups() {
    return;
  }
  @Get('group/:id')
  async getSpecGroup() {
    return;
  }
  @Get('newgroup')
  async makeNewGroup() {
    return;
  }
}