import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateDepoBalanceDto extends PartialType(CreateUserDto) {
    balance?: number;
}

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
    currentPassword?: string;
    newPassword?: string;
}
