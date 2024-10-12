export class CreateUserDto {
    id: number;
    role: string;
    userName: string;
    phone: string;
    email: string;
    password: string;
    balance: number;
}

export class LoginDto {
    email: string;
    password: string;
}