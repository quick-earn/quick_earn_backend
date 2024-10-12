import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto, UpdateRemainingWatchTimeDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { Any, createQueryBuilder, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(ActivityEntity)
    private readonly activityRepository: Repository<ActivityEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    let activity: ActivityEntity = new ActivityEntity()

    const isPackageActive = await this.activityRepository.findOne({
      where: {
        userId: createActivityDto.userId,
        packageId: createActivityDto.packageId,
        packageStatus: "active"
      }
    });
    
    if(!isPackageActive) {
      activity.userId = createActivityDto.userId;
      activity.packageId = createActivityDto.packageId;
      activity.packageTitle = createActivityDto.packageTitle;
      activity.packageStatus = createActivityDto.packageStatus;
      activity.remainActive = createActivityDto.remainActive;
      activity.remainWatchTime = createActivityDto.remainWatchTime;
      await this.activityRepository.save(activity);
      return true;
    } else {
      return "This package is already active in your profile"
    }
  }

  async ResetRemainWatchTime() {
    const activePackages = await this.activityRepository.find({
      where: {
        packageStatus: "active"
      }
    });
    
    if(!activePackages) {
      return ""
    } else {
      await this.activityRepository
      .createQueryBuilder()
      .update(ActivityEntity)
      .set({
        remainWatchTime: () =>
          `CASE 
             WHEN "packageId" = 1 THEN 3
             WHEN "packageId" = 2 THEN 6
           END`,
      })
    .where('packageId IN (:...packageIds)', { packageIds: [1, 2] })
    .execute();
    }
  }

  async ExpirePackages() {
    const activePackages = await this.activityRepository.find({
      where: {
        packageStatus: "active"
      }
    });

    if(activePackages.length == 0) {
      return "No active packages";
    } else if(activePackages[0].remainActive != 0) {
      await this.activityRepository
      .createQueryBuilder()
      .update(ActivityEntity)
      .set({
        remainActive: () => `"remainActive" - 1`
      }).execute()
    } else {
      await this.activityRepository
      .createQueryBuilder()
      .update(ActivityEntity)
      .set({
        packageStatus: `expired`
      }).execute()
    }
  }

  findAll() {
    return this.activityRepository.find();
  }

  async FindActivatedPackagesByUserId(id: number) {
    return await this.activityRepository.find({
      where: {
        userId: id,
        packageStatus: "active"
      }
    });
  }

  // Deduct Remaing Watch Times and Increment Balance
  async UpdateRWTB(id: number, updateRemainingWatchTimeDto: UpdateRemainingWatchTimeDto) {
    const prevRWT = await this.activityRepository.findOne({
      where: {
        userId: id,
        packageId: updateRemainingWatchTimeDto.packageId
      }
    });

    const prevUserData = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(prevRWT.remainWatchTime != 0) {
      const newRWT = {
        ...prevRWT,
        remainWatchTime: updateRemainingWatchTimeDto.remainWatchTime - 1
      }

      // Add 100 BDT with previous balance
      const sumBalance = prevUserData.balance + 100

      const newBalance = {
        ...prevUserData,
        balance: sumBalance
      }
      await this.userRepository.save(newBalance);
      await this.activityRepository.save(newRWT);
      return "100 BDT will be added to your account";
    } else {
      return "Caught up";
    }
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
