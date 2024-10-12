import { AdsService } from './ads.service';
export declare class AdsController {
    private readonly adsService;
    constructor(adsService: AdsService);
    uploadVideo(file: Express.Multer.File): {
        message: string;
        filename: string;
    };
    getAdsVideos(): {
        url: string;
        filename: string;
    }[];
}
