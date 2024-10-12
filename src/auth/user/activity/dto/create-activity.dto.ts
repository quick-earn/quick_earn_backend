export class CreateActivityDto {
    userId: number;
    packageId: number;
    packageTitle: string;
    packageStatus: string;
    remainActive: number;
    remainWatchTime: number;
}
