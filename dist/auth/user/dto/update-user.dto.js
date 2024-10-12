"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = exports.UpdateDepoBalanceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class UpdateDepoBalanceDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateDepoBalanceDto = UpdateDepoBalanceDto;
class UpdatePasswordDto extends (0, mapped_types_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update-user.dto.js.map