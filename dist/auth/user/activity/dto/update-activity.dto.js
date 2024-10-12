"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRemainingWatchTimeDto = exports.UpdateActivityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_activity_dto_1 = require("./create-activity.dto");
class UpdateActivityDto extends (0, mapped_types_1.PartialType)(create_activity_dto_1.CreateActivityDto) {
}
exports.UpdateActivityDto = UpdateActivityDto;
class UpdateRemainingWatchTimeDto extends (0, mapped_types_1.PartialType)(create_activity_dto_1.CreateActivityDto) {
}
exports.UpdateRemainingWatchTimeDto = UpdateRemainingWatchTimeDto;
//# sourceMappingURL=update-activity.dto.js.map