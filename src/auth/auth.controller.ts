import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() LoginUserDto, @Res() res){
    // appeler la méthode de validation par password de authService
    const result = await this.authService.validateUserByPassword(LoginUserDto);
    if(result.success){
    return res.json(result.data);
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({msg: result.msg});
    }
    // si c'est bon on passe les données json
    // sinon on renvoie une entete HTTP UNAUTHORIZED


  }
}
