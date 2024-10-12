export class CreateDepodrawDto {
    depodrawId: number;
    userId: number;
    phone: string;
    amount: string;
    requestType: 'deposit' | 'withdraw';
    transactionId: string;
    paymentMethod: string;
    status: string;
}
