import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { User } from 'src/user/user.entity';
import { JwtPayload, JwtToken } from './auth.interface';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gaurd/gaurd';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    console.log(user);
    const { newUser, isNewUser } = await this.authService.getOrCreateUser(user);
    console.log(newUser);

    const payload: JwtPayload = { sub: newUser.id, email: newUser.email };

    const { accessToken, refreshToken } =
      await this.authService.getToken(payload);

    console.log(accessToken, 'a\nr', refreshToken);

    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);

    await this.authService.updateHashedRefreshToken(newUser.id, refreshToken);

    if (isNewUser) {
      res.cookie('loggedIn', 'false');
    } else {
      res.cookie('loggedIn', 'true');
    }

    res.redirect(`${process.env.FRONTEND_URL}/login/callback`);
  }

  @Post('refresh')
  @UseGuards(GqlAuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const { refreshToken, sub, email } = req.user as JwtPayload & {
      refreshToken: string;
    };

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      //if there are no refresh token matches, this will throw an UnauthorizedException
      const user : User = await this.authService.getUserIfRefreshTokenMatches(
        sub,
        refreshToken,
      );

      const token: JwtToken = await this.authService.getToken({ sub, email });
      const updatedAccessToken = token.accessToken;
      const updatedRefreshToken = token.refreshToken;

      await this.authService.updateHashedRefreshToken(user.id, updatedRefreshToken);

      res.cookie('accessToken', updatedAccessToken, { httpOnly: true, sameSite: 'strict' });
      res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true, sameSite: 'strict' });

      return res.json({ accessToken: updatedAccessToken, refreshToken: updatedRefreshToken });

    } catch (e) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).send('Unauthorized');
    }
  }
}
