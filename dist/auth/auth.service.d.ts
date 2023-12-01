import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './refresh-token.entity';
import { JwtPayload, JwtToken, NewUserJudge } from './auth.interface';
export declare class AuthService {
    private userRepository;
    private refreshTokenRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, refreshTokenRepository: Repository<RefreshToken>, jwtService: JwtService);
    getOrCreateUser(userGoogleInput: any): Promise<NewUserJudge>;
    getToken(payload: JwtPayload): Promise<JwtToken>;
    updateHashedRefreshToken(userId: number, refreshToken: string): Promise<void>;
    getUserIfRefreshTokenMatches(userId: number, refreshToken: string): Promise<User>;
}
