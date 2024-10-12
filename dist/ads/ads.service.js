"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let AdsService = class AdsService {
    constructor() {
        this.adsDirectory = path.join(process.cwd(), 'uploads', 'Ads');
        this.ensureAdsDirectoryExists();
    }
    ensureAdsDirectoryExists() {
        if (!fs.existsSync(this.adsDirectory)) {
            fs.mkdirSync(this.adsDirectory, { recursive: true });
        }
    }
    saveVideo(filename) {
        return { message: 'Video uploaded successfully!', filename };
    }
    getAllVideos() {
        try {
            this.ensureAdsDirectoryExists();
            const files = fs.readdirSync(this.adsDirectory);
            if (files.length === 0) {
                throw new common_1.NotFoundException('No ads found.');
            }
            return files.map(file => ({
                url: `/uploads/Ads/${file}`,
                filename: file,
            }));
        }
        catch (error) {
            console.error('Error fetching ads:', error.message);
            throw new common_1.NotFoundException(`Could not retrieve ads: ${error.message}`);
        }
    }
};
exports.AdsService = AdsService;
exports.AdsService = AdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AdsService);
//# sourceMappingURL=ads.service.js.map