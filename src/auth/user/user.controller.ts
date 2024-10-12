import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/create-user.dto';
import { UpdateDepoBalanceDto, UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("isEmailExist/:email")
  FindByEmail(@Param("email") email: string = "") {
    return this.userService.FindByEmail(email);
  }

  @Post("register")
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("loginAuth")
  LogInAuth(@Body() loginDto: LoginDto) {
    return this.userService.LogInAuth(loginDto.email, loginDto.password);
  }

  @Get("getDataById/:id")
  GetDataById(@Param("id") id: number) {
    return this.userService.GetDataById(id);
  }

  @Get("/getAllUsers")
  async GetAllUsers() {
    return this.userService.findAll();
  }

  @Patch('updateDepoBalance/:id')
  update(@Param('id') id: string, @Body() updateDepoBalanceDto: UpdateDepoBalanceDto) {
    return this.userService.UpdatateDepoBalance(+id, updateDepoBalanceDto);
  }

  @Patch("changePassword/:id")
  ChangePassword(@Param("id") id: number, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.userService.ChangePassword(+id, updatePasswordDto);
  }

  // @Get("findAll")
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':email')
  // findOne(@Param('email') email: string) {
  //   return this.userService.findOne(email);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
