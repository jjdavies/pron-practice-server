import { Controller, Get, Param, Body, Post, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityDto } from 'src/dto/activity.dto';
import { ActivityGroupDto } from 'src/dto/activitygroup.dto';

import { v4 as uuidv4 } from 'uuid';

@Controller('activity')
export class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Delete()
  async deleteAll() {
    this.activityService.clearAllActivityData();
  }

  @Delete('/group/:uuid')
  async deleteOne(@Param('uuid') uuid: string) {
    // console.log('delete', uuid);
    return this.activityService.deleteGroup(uuid);
  }

  @Get()
  async getAllActivities() {
    return 'return all activities';
  }

  @Get('all/:activitygroupid')
  async getAllGroupActivities(
    @Param('activitygroupid') activitygroupid: string,
  ) {
    return this.activityService.getAllGroupActivities(activitygroupid);
  }

  @Get('/newgroup')
  async makeNewGroup() {
    const uuid = uuidv4();
    return this.activityService.createActivityGroup(uuid);
  }
  @Post('setgroup')
  async setGroup(@Body() activityGroupDto: ActivityGroupDto) {
    // activityGroupDto.uuid =
    //   activityGroupDto.uuid !== undefined ? activityGroupDto.uuid : uuidv4();
    // activityGroupDto.title =
    //   activityGroupDto.title !== undefined ? activityGroupDto.title : '';
    // activityGroupDto.activities =
    //   activityGroupDto.activities !== undefined
    //     ? activityGroupDto.activities
    //     : [];

    return this.activityService.setActivityGroup(activityGroupDto);
  }

  @Get(':activityid')
  async getSpecActivity(@Param('activityid') activityid: string) {
    return this.activityService.getActivity(activityid);
  }
  @Post()
  async setActivity(@Body() activityDto: ActivityDto) {
    console.log('set activity dto: ', activityDto);
    // activityDto.uuid =
    //   activityDto.uuid !== undefined ? activityDto.uuid : uuidv4();
    // activityDto.activityGroupID =
    //   activityDto.activityGroupID !== undefined
    //     ? activityDto.activityGroupID
    //     : '';
    // activityDto.title =
    //   activityDto.title !== undefined ? activityDto.title : '';
    // activityDto.fileuuid =
    //   activityDto.fileuuid !== undefined ? activityDto.fileuuid : '';
    // activityDto.options =
    //   activityDto.options !== undefined ? activityDto.options : [''];
    // activityDto.preceding =
    //   activityDto.preceding !== undefined ? activityDto.preceding : '';
    // console.log(activityDto);
    return await this.activityService.setActivity(activityDto);
  }
  @Get('group/all')
  async getAllGroups() {
    return this.activityService.getAllGroups();
  }
  @Get('group/:id')
  async getSpecGroup(@Param('activitygroupid') activitygroupid: string) {
    return activitygroupid;
  }
}
