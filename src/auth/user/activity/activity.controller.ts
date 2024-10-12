import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto, UpdateRemainingWatchTimeDto } from './dto/update-activity.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post("/createActivity")
  async create(@Body() createActivityDto: CreateActivityDto) {
    return await this.activityService.create(createActivityDto);
  }

  @Get()
  async findAll() {
    return await this.activityService.findAll();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async UpdateWatchedTime() {
    return await this.activityService.ResetRemainWatchTime()
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async ExpirePackages() {
    return await this.activityService.ExpirePackages()
  }

  @Get('getActivatedPackagesByUserId/:id')
  async GetActivatedPackagesByUserId(@Param('id') id: string) {
    return await this.activityService.FindActivatedPackagesByUserId(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Patch("updateRWTandBalance/:id")
  async updateRWT(@Param('id') id: string, @Body() updateRWT: UpdateRemainingWatchTimeDto) {
    return await this.activityService.UpdateRWTB(+id, updateRWT);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
