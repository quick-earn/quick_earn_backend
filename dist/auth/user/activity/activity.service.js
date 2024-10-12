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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_entity_1 = require("./entities/activity.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
let ActivityService = class ActivityService {
    constructor(activityRepository, userRepository) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
    }
    async create(createActivityDto) {
        let activity = new activity_entity_1.ActivityEntity();
        const isPackageActive = await this.activityRepository.findOne({
            where: {
                userId: createActivityDto.userId,
                packageId: createActivityDto.packageId,
                packageStatus: "active"
            }
        });
        if (!isPackageActive) {
            activity.userId = createActivityDto.userId;
            activity.packageId = createActivityDto.packageId;
            activity.packageTitle = createActivityDto.packageTitle;
            activity.packageStatus = createActivityDto.packageStatus;
            activity.remainActive = createActivityDto.remainActive;
            activity.remainWatchTime = createActivityDto.remainWatchTime;
            await this.activityRepository.save(activity);
            return true;
        }
        else {
            return "This package is already active in your profile";
        }
    }
    async ResetRemainWatchTime() {
        const activePackages = await this.activityRepository.find({
            where: {
                packageStatus: "active"
            }
        });
        if (!activePackages) {
            return "";
        }
        else {
            await this.activityRepository
                .createQueryBuilder()
                .update(activity_entity_1.ActivityEntity)
                .set({
                remainWatchTime: () => `CASE 
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
        if (activePackages.length == 0) {
            return "No active packages";
        }
        else if (activePackages[0].remainActive != 0) {
            await this.activityRepository
                .createQueryBuilder()
                .update(activity_entity_1.ActivityEntity)
                .set({
                remainActive: () => `"remainActive" - 1`
            }).execute();
        }
        else {
            await this.activityRepository
                .createQueryBuilder()
                .update(activity_entity_1.ActivityEntity)
                .set({
                packageStatus: `expired`
            }).execute();
        }
    }
    findAll() {
        return this.activityRepository.find();
    }
    async FindActivatedPackagesByUserId(id) {
        return await this.activityRepository.find({
            where: {
                userId: id,
                packageStatus: "active"
            }
        });
    }
    async UpdateRWTB(id, updateRemainingWatchTimeDto) {
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
        if (prevRWT.remainWatchTime != 0) {
            const newRWT = {
                ...prevRWT,
                remainWatchTime: updateRemainingWatchTimeDto.remainWatchTime - 1
            };
            const sumBalance = prevUserData.balance + 100;
            const newBalance = {
                ...prevUserData,
                balance: sumBalance
            };
            await this.userRepository.save(newBalance);
            await this.activityRepository.save(newRWT);
            return "100 BDT will be added to your account";
        }
        else {
            return "Caught up";
        }
    }
    update(id, updateActivityDto) {
        return `This action updates a #${id} activity`;
    }
    remove(id) {
        return `This action removes a #${id} activity`;
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.ActivityEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ActivityService);
//# sourceMappingURL=activity.service.js.map