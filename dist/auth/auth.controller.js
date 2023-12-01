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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const gaurd_1 = require("./gaurd/gaurd");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async googleAuth() { }
    async googleAuthCallback(req, res) {
        const { user } = req;
        console.log(user);
        const { newUser, isNewUser } = await this.authService.getOrCreateUser(user);
        console.log(newUser);
        const payload = { sub: newUser.id, email: newUser.email };
        const { accessToken, refreshToken } = await this.authService.getToken(payload);
        console.log(accessToken, 'a\nr', refreshToken);
        res.cookie('accessToken', accessToken);
        res.cookie('refreshToken', refreshToken);
        await this.authService.updateHashedRefreshToken(newUser.id, refreshToken);
        if (isNewUser) {
            res.cookie('loggedIn', 'false');
        }
        else {
            res.cookie('loggedIn', 'true');
        }
        res.redirect(`${process.env.FRONTEND_URL}/login/callback`);
    }
    async refreshToken(req, res) {
        const { refreshToken, sub, email } = req.user;
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        try {
            const user = await this.authService.getUserIfRefreshTokenMatches(sub, refreshToken);
            const token = await this.authService.getToken({ sub, email });
            const updatedAccessToken = token.accessToken;
            const updatedRefreshToken = token.refreshToken;
            await this.authService.updateHashedRefreshToken(user.id, updatedRefreshToken);
            res.cookie('accessToken', updatedAccessToken, { httpOnly: true, sameSite: 'strict' });
            res.cookie('refreshToken', updatedRefreshToken, { httpOnly: true, sameSite: 'strict' });
            return res.json({ accessToken: updatedAccessToken, refreshToken: updatedRefreshToken });
        }
        catch (e) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.status(401).send('Unauthorized');
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.UseGuards)((0, gaurd_1.GqlAuthGuard)('jwt-refresh')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map