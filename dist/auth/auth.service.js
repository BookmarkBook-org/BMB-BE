"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const refresh_token_entity_1 = require("./refresh-token.entity");
const bcrypt = require("bcrypt");
const typeorm_2 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    constructor(userRepository, refreshTokenRepository, jwtService) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
    }
    async getOrCreateUser(userGoogleInput) {
        try {
            const user = await this.userRepository.findOne({
                where: { email: userGoogleInput.email },
            });
            if (user) {
                return { newUser: user, isNewUser: false };
            }
            else {
                const newUser = this.userRepository.create({
                    name: userGoogleInput.name,
                    email: userGoogleInput.email,
                    googleId: userGoogleInput.googleId,
                });
                await this.userRepository.save(newUser);
                return { newUser, isNewUser: true };
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    async getToken(payload) {
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
    async updateHashedRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 12);
        await this.refreshTokenRepository.save({
            userId,
            hashedRefreshToken,
        });
    }
    async getUserIfRefreshTokenMatches(userId, refreshToken) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const storedRefreshToken = await this.refreshTokenRepository.findOne({
            where: { userId },
            order: { id: 'DESC' }
        });
        if (!storedRefreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        const isTokenMatching = await bcrypt.compare(refreshToken, storedRefreshToken.hashedRefreshToken);
        if (!isTokenMatching) {
            throw new common_1.UnauthorizedException('Refresh token does not match');
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_2.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map