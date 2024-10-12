import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { PackagesModule } from './packages/packages.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PackagesModule,
    ActivityModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
