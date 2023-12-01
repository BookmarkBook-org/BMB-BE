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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async writeSelfIntro(userId, selfIntro, queryRunner) {
        await queryRunner.manager
            .getRepository(user_entity_1.User)
            .update({ id: userId }, { selfIntroduction: selfIntro });
        return 'self introduction updated';
    }
    async updateUserNickname(userId, nickname, queryRunner) {
        await queryRunner.manager
            .getRepository(user_entity_1.User)
            .update({ id: userId }, { nickname });
        return 'user nickname updated';
    }
    async deleteUser(userId, queryRunner) {
        await queryRunner.manager.getRepository(user_entity_1.User).delete({ id: userId });
        console.log('user deleted');
        return 'user deleted';
    }
    async getUserInfo(userId, queryRunner) {
        return await queryRunner.manager
            .getRepository(user_entity_1.User)
            .findOne({ where: { id: userId } });
    }
    async findUserByUserId(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        return user;
    }
    async getAllUserId(queryRunner) {
        const users = await queryRunner.manager
            .getRepository(user_entity_1.User)
            .find();
        const userIds = users.map((user) => user.id);
        return userIds;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map