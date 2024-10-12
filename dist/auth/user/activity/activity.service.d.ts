import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto, UpdateRemainingWatchTimeDto } from './dto/update-activity.dto';
import { ActivityEntity } from './entities/activity.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
export declare class ActivityService {
    private readonly activityRepository;
    private readonly userRepository;
    constructor(activityRepository: Repository<ActivityEntity>, userRepository: Repository<UserEntity>);
    create(createActivityDto: CreateActivityDto): Promise<true | "This package is already active in your profile">;
    ResetRemainWatchTime(): Promise<string>;
    ExpirePackages(): Promise<string>;
    findAll(): Promise<ActivityEntity[]>;
    FindActivatedPackagesByUserId(id: number): Promise<ActivityEntity[]>;
    UpdateRWTB(id: number, updateRemainingWatchTimeDto: UpdateRemainingWatchTimeDto): Promise<"100 BDT will be added to your account" | "Caught up">;
    update(id: number, updateActivityDto: UpdateActivityDto): string;
    remove(id: number): string;
}
