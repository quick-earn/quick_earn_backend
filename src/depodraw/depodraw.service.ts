import { Injectable } from '@nestjs/common';
import { CreateDepodrawDto } from './dto/create-depodraw.dto';
import { UpdateDepoStatusDto } from './dto/update-depodraw.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DepodrawEntity } from './entities/depodraw.entity';
import { Repository } from 'typeorm';
import { UserService } from './../auth/user/user.service';

@Injectable()
export class DepodrawService {
  constructor(
    @InjectRepository(DepodrawEntity)
    private readonly depdrawRepository: Repository<DepodrawEntity>,
    private readonly userService: UserService
  ){}

  async getTransactionId(transactionId: string) {
    const result = await this.depdrawRepository.find({
      where: {
        transactionId: transactionId
      }
    });

    return result.length == 0 ? false : true;
  }

  async create(createDepodrawDto: CreateDepodrawDto) {
    // Only check transaction ID for deposits
    if (createDepodrawDto.requestType === 'deposit') {
      if (!createDepodrawDto.transactionId) {
        return 'Transaction ID is required for deposits';
      }
      
      const checkTransactionId = await this.getTransactionId(createDepodrawDto.transactionId);
      if (checkTransactionId) {
        return false;
      }
    }

    const user = await this.userService.GetDataById(createDepodrawDto.userId);
    if (!user) {
      return 'User not found';
    }

    let depodraw: DepodrawEntity = new DepodrawEntity();
    depodraw.userId = createDepodrawDto.userId;
    depodraw.phone = createDepodrawDto.phone;
    depodraw.amount = createDepodrawDto.amount;
    depodraw.requestType = createDepodrawDto.requestType;
    depodraw.paymentMethod = createDepodrawDto.paymentMethod;
    depodraw.status = 'pending';

    // Only set transaction ID for deposits
    if (createDepodrawDto.requestType === 'deposit') {
      depodraw.transactionId = createDepodrawDto.transactionId;
    }

    // If it's a withdrawal request, check balance and deduct immediately
    if (createDepodrawDto.requestType === 'withdraw') {
      const withdrawAmount = parseFloat(createDepodrawDto.amount);
      if (user.balance < withdrawAmount) {
        return 'Insufficient balance';
      }

      // Deduct the amount immediately
      await this.userService.UpdatateDepoBalance(user.id, {
        balance: -withdrawAmount
      });
    }

    return await this.depdrawRepository.save(depodraw);
  }

  async GetAllRequest() {
    return await this.depdrawRepository.find();
  }

  async GetDepositRequests() {
    return await this.depdrawRepository.find({
      where: {
        requestType: 'deposit'
      }
    });
  }

  async GetWithdrawRequests() {
    return await this.depdrawRepository.find({
      where: {
        requestType: 'withdraw'
      }
    });
  }

  async UpdatateDepoStatus(id: number, updateDepoStatusDto: UpdateDepoStatusDto) {
    const request = await this.depdrawRepository.findOne({
      where: {
        depodrawId: id
      }
    });

    if (!request) {
      return "Request id not found";
    }

    if (request.status !== 'pending') {
      return `This request has already been ${request.status}`;
    }

    const user = await this.userService.GetDataById(request.userId);
    if (!user) {
      return 'User not found';
    }

    const amount = parseFloat(request.amount);

    // Handle deposit request
    if (request.requestType === 'deposit') {
      if (updateDepoStatusDto.status === 'accepted') {
        await this.userService.UpdatateDepoBalance(user.id, {
          balance: amount
        });
      }
    }
    // Handle withdraw request
    else if (request.requestType === 'withdraw') {
      if (updateDepoStatusDto.status === 'rejected') {
        // Refund the amount if rejected
        await this.userService.UpdatateDepoBalance(user.id, {
          balance: amount
        });
      }
    }

    const updatedData = this.depdrawRepository.merge(request, updateDepoStatusDto);
    await this.depdrawRepository.save(updatedData);
    return updatedData.status;
  }
}