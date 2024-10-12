import { Injectable } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageEntity } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { BuyPackageDto } from './dto/buy-package.dto';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(PackageEntity)
    private readonly packageRepository: Repository<PackageEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async Create(createPackageDto: CreatePackageDto) {
    let packagesEntity: PackageEntity = new PackageEntity();
    packagesEntity.title = createPackageDto.title;
    packagesEntity.duration = createPackageDto.duration;
    packagesEntity.description = createPackageDto.description;
    packagesEntity.price = createPackageDto.price;

    return this.packageRepository.save(packagesEntity);
  }

  async findAll() {
    return this.packageRepository.find();
  }

  async buyPackage(buyPackageDto: BuyPackageDto) {
    const { userId, packageId } = buyPackageDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const packageToBuy = await this.packageRepository.findOne({
      where: { packagesId: packageId },
    });

    if (!user) {
      return `User with ID ${userId} not found`;
    }

    if (!packageToBuy) {
      return `Package with ID ${packageId} not found`;
    }

    if (user.balance < packageToBuy.price) {
      return `Insufficient balance. The package price is ${packageToBuy.price} and your balance is ${user.balance}`;
    }
    user.balance -= packageToBuy.price;
    await this.userRepository.save(user);

    return `Package purchased successfully! Remaining balance: ${user.balance}`;
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    return `This action updates a #${id} package`;
  }

  remove(id: number) {
    return `This action removes a #${id} package`;
  }
}