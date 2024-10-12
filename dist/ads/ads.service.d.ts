export declare class AdsService {
    private readonly adsDirectory;
    constructor();
    private ensureAdsDirectoryExists;
    saveVideo(filename: string): {
        message: string;
        filename: string;
    };
    getAllVideos(): {
        url: string;
        filename: string;
    }[];
}
