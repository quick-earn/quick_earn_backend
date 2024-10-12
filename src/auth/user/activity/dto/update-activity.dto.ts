import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {}

export class UpdateRemainingWatchTimeDto extends PartialType(CreateActivityDto) {
    packageId?: number;
    remainWatchTime?: number;
}