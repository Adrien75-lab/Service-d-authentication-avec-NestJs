import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interfaces/jwtpayload.intefaces';
import { LoginUserDto } from './login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUserByPassword(LoginUserDto: LoginUserDto): Promise<any> {
    const user = await this.usersService.findByEmail(LoginUserDto.email);
    console.log('user', user);
    return new Promise((resolve) => {
      if (!user) {
        resolve({ success: false, msg: 'User not found' });
      }
      user.validatePassword(LoginUserDto.password, (err, isMatch) => {
        if (isMatch) {
          resolve({ success: true, data: this.createJwtPayload(user) });
        } else {
          resolve({ success: false, msg: 'wrong user or password' });
        }
      });
    });
  }
  createJwtPayload(user : UserDocument){
      const payload:JwtPayload = {
          sub:user._id,
          email:user.email
      }
      const jwt = this.jwtService.sign(payload);
      return{
          exp:3600,
          token:jwt
      }
  }
}
