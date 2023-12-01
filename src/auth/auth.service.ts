import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload, JwtToken, NewUserJudge } from './auth.interface';

export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async getOrCreateUser(userGoogleInput: any): Promise<NewUserJudge> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: userGoogleInput.email },
      });
      if (user) {
        return {newUser: user, isNewUser: false}
      } else {
        const newUser = this.userRepository.create({
          name: userGoogleInput.name,
          email: userGoogleInput.email,
          googleId: userGoogleInput.googleId,
        });
        await this.userRepository.save(newUser);
        return {newUser, isNewUser: true}
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getToken(payload: JwtPayload): Promise<JwtToken> {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '5h',
      secret: process.env.JWT_SECRET,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateHashedRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
    await this.refreshTokenRepository.save({
      userId,
      hashedRefreshToken,
    });
    
  }

  async getUserIfRefreshTokenMatches(userId: number, refreshToken: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const storedRefreshToken = await this.refreshTokenRepository.findOne({
      where:  {userId},
      order: {id: 'DESC'}
    });

    if (!storedRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const isTokenMatching = await bcrypt.compare(refreshToken, storedRefreshToken.hashedRefreshToken);

    if (!isTokenMatching) {
      throw new UnauthorizedException('Refresh token does not match');
    }

    return user;
  }

}
