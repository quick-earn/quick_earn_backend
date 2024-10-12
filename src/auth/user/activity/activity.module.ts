import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { PackagesService } from '../packages/packages.service';
import { UserEntity } from '../entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ActivityEntity, UserEntity])
  ],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
