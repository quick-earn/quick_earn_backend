import { Module, forwardRef } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';
import { UserEntity } from '../entities/user.entity';
import { UserModule } from '../user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageEntity, UserEntity]),
    forwardRef(() => UserModule) 
  ],
  
  controllers: [PackagesController],
  providers: [PackagesService],
})
export class PackagesModule {}
