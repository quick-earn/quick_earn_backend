import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateDepoBalanceDto, UpdatePasswordDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async FindByEmail(email: string) {
    const result = await this.userRepository.find({
      where: {
        email: email
      }
    });

    return result.length == 0 ? false : true;
  }

  async create(createUserDto: CreateUserDto) {
    let checkUser = await this.FindByEmail(createUserDto.email);

    if (!checkUser){
      let user: UserEntity = new UserEntity();

      user.role = createUserDto.role;
      user.userName = createUserDto.userName;
      user.phone = createUserDto.phone;
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.balance = createUserDto.balance;
  
      return await this.userRepository.save(user);
    } else {
      return `${createUserDto.email} is already exist`;
    }
  }

  async GetDataById(id: number) {
    const result = await this.userRepository.find({
      where: {
        id: id
      }
    });

    return result.length === 0 ? null : result[0];
  }

  async LogInAuth(email: string, password: string) {
    const result = await this.userRepository.find({
      where: {
        email: email,
        password: password
      }
    });

    return result.length === 0 ? null : result[0];
  }

  async findAll() {
    const res = await this.userRepository.find();
    return res;
  }

  async UpdatateDepoBalance(id: number, updateDepoBalanceDto: UpdateDepoBalanceDto) {
    const getPrevData = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!getPrevData) {
      return "Id not found";
    } else {
      const sumBalance = getPrevData.balance + updateDepoBalanceDto.balance;
      const updatedData = {
        ...getPrevData,
        balance: sumBalance
      }
      await this.userRepository.save(updatedData);
      return "Balance has been updated";
    }
  }

  async ChangePassword(id: number, updatePasswordDto: UpdatePasswordDto) {
    const isUserExist = await this.userRepository.findOne({
      where: {
        id: id
      }
    });

    if(!isUserExist) {
      return "User not found"
    } else if(updatePasswordDto.currentPassword == isUserExist.password) {
      if(updatePasswordDto.currentPassword == updatePasswordDto.newPassword) {
        return "Current password could not be the new password!"
      } else {
        const newData = {
          ...isUserExist,
          password: updatePasswordDto.newPassword
        }
        await this.userRepository.save(newData);
        return "Password changed"
      }
    } else {
      return "Current password did not match"
    }
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
