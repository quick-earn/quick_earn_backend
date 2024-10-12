import { CreateActivityDto } from './create-activity.dto';
declare const UpdateActivityDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateActivityDto>>;
export declare class UpdateActivityDto extends UpdateActivityDto_base {
}
declare const UpdateRemainingWatchTimeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateActivityDto>>;
export declare class UpdateRemainingWatchTimeDto extends UpdateRemainingWatchTimeDto_base {
    packageId?: number;
    remainWatchTime?: number;
}
export {};
