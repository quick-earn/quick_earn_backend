import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { BuyPackageDto } from './dto/buy-package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Post("createPackage")
  create(@Body() createPackageDto: CreatePackageDto) {
    return this.packagesService.Create(createPackageDto);
  }
  
  @Post('buy')
  buyPackage(@Body() buyPackageDto: BuyPackageDto) {
    return this.packagesService.buyPackage(buyPackageDto);
  }

  @Get()
  findAll() {
    return this.packagesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePackageDto: UpdatePackageDto) {
    return this.packagesService.update(+id, updatePackageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
