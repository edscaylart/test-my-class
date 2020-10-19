import { Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CurrentUser } from './decorators/users.decorator';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('session')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  /** TESTE DE REQUISIÇÃO COM TOKEN */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@CurrentUser('userId') userId: any) {
    console.log(userId);
    return 'Tudo ok com token';
  }
}
