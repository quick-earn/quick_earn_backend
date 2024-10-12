import { Module } from '@nestjs/common';
import { DepodrawService } from './depodraw.service';
import { DepodrawController } from './depodraw.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepodrawEntity } from './entities/depodraw.entity';
import { UserModule } from './../auth/user/user.module';  // Import the UserModule

@Module({
  imports: [
    TypeOrmModule.forFeature([DepodrawEntity]),
    UserModule  // Add UserModule here
  ],
  controllers: [DepodrawController],
  providers: [DepodrawService],
})
export class DepodrawModule {}
