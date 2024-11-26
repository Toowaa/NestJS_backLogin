import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLoginService } from './user-login.service';
import { CreateUserLoginDto } from './dto/create-user-login.dto';
import { UpdateUserLoginDto } from './dto/update-user-login.dto';
import { Public } from 'src/auth/auth/publickey';


@Controller('user')
export class UserLoginController {
  constructor(private userLoginService: UserLoginService) {}

  @Public()
  @Post()
  createuser(@Body() newUser:CreateUserLoginDto ) {
    return this.userLoginService.createuser(newUser);

  }

  @Public()
  @Get()
  findAll() {
    return this.userLoginService.findAll();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLoginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLoginDto: UpdateUserLoginDto) {
    return this.userLoginService.update(+id, updateUserLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLoginService.remove(+id);
  }

  @Get('email/:email')
  findOneByEmial(@Param('email')email:string){
    return this.userLoginService.findOneByEmail(email);
  }
}
