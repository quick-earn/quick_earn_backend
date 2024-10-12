import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto, UpdateRemainingWatchTimeDto } from './dto/update-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto): Promise<true | "This package is already active in your profile">;
    findAll(): Promise<import("./entities/activity.entity").ActivityEntity[]>;
    UpdateWatchedTime(): Promise<string>;
    ExpirePackages(): Promise<string>;
    GetActivatedPackagesByUserId(id: string): Promise<import("./entities/activity.entity").ActivityEntity[]>;
    update(id: string, updateActivityDto: UpdateActivityDto): Promise<string>;
    updateRWT(id: string, updateRWT: UpdateRemainingWatchTimeDto): Promise<"100 BDT will be added to your account" | "Caught up">;
    remove(id: string): string;
}
