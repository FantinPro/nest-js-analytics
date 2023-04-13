import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService, JwtPayload } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: { user: JwtPayload }) {
    const { password, ...userWithoutPassword } =
      await this.usersService.findOne({ id: req.user.id });
    return userWithoutPassword;
  }
}
