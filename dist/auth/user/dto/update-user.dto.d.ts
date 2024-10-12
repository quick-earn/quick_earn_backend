import { CreateUserDto } from './create-user.dto';
declare const UpdateDepoBalanceDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateDepoBalanceDto extends UpdateDepoBalanceDto_base {
    balance?: number;
}
declare const UpdatePasswordDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdatePasswordDto extends UpdatePasswordDto_base {
    currentPassword?: string;
    newPassword?: string;
}
export {};
