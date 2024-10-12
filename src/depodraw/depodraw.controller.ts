import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { DepodrawService } from './depodraw.service';
import { CreateDepodrawDto } from './dto/create-depodraw.dto';
import { UpdateDepoStatusDto } from './dto/update-depodraw.dto';

@Controller('depodraw')
export class DepodrawController {
  constructor(private readonly depodrawService: DepodrawService) {}

  @Post()
  create(@Body() createDepodrawDto: CreateDepodrawDto) {
    return this.depodrawService.create(createDepodrawDto);
  }

  @Get()
  GetAllRequest() {
    return this.depodrawService.GetAllRequest();
  }

  @Get('deposits')
  GetDepositRequests() {
    return this.depodrawService.GetDepositRequests();
  }

  @Get('withdrawals')
  GetWithdrawRequests() {
    return this.depodrawService.GetWithdrawRequests();
  }

  @Patch("status/:id")
  UpdateStatus(@Param("id") depodrawId: number, @Body() updateDepoStatusDto: UpdateDepoStatusDto) {
    return this.depodrawService.UpdatateDepoStatus(depodrawId, updateDepoStatusDto);
  }
}