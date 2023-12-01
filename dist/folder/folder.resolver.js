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
exports.FolderResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const folder_entity_1 = require("./folder.entity");
const folder_dto_1 = require("./folder.dto");
const folder_service_1 = require("./folder.service");
let FolderResolver = class FolderResolver {
    constructor(folderService, dataSource) {
        this.folderService = folderService;
        this.dataSource = dataSource;
    }
    async getFolderInfo(folderId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const folder = await this.folderService.getFolder(folderId, queryRunner);
            return folder;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createFolder(createFolderInput, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const folder = await this.folderService.createFolder(createFolderInput, userId, queryRunner);
            await queryRunner.commitTransaction();
            return folder;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateFolder(folderId, title, isShared) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const folder = await this.folderService.updateFolder(folderId, title, isShared, queryRunner);
            await queryRunner.commitTransaction();
            return folder;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async changeFolderStatus(folderId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const folder = await this.folderService.changeFolderStatus(folderId, queryRunner);
            await queryRunner.commitTransaction();
            return folder;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteFolder(folderId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const folder = await this.folderService.deleteFolder(folderId, queryRunner);
            await queryRunner.commitTransaction();
            return folder;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteAllList(userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const folder = await this.folderService.deleteAllList(userId, queryRunner);
            await queryRunner.commitTransaction();
            return folder;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getAllListByParentFolderName(parentFolderName, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const list = await this.folderService.getAllListByParentFolderName(parentFolderName, userId, queryRunner);
            return list;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getAllListByUserId(userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const list = await this.folderService.getAllListByUserId(userId, queryRunner);
            return list;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getSharedListByParentFolderName(parentFolderName, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const list = await this.folderService.getSharedListByParentFolderName(parentFolderName, userId, queryRunner);
            return list;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getMyPage(userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const myPage = await this.folderService.getMyPage(userId, queryRunner);
            return myPage;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getSharedPage(userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            const sharedPage = await this.folderService.getSharedPage(userId, queryRunner);
            return sharedPage;
        }
        catch (err) {
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.FolderResolver = FolderResolver;
__decorate([
    (0, graphql_1.Query)(() => folder_entity_1.Folder),
    __param(0, (0, graphql_1.Args)('folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getFolderInfo", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('create_folder_input')),
    __param(1, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [folder_dto_1.createFolderInput, Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "createFolder", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('folder_id')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('is_shared')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "updateFolder", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "changeFolderStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('folder_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "deleteFolder", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "deleteAllList", null);
__decorate([
    (0, graphql_1.Query)(() => folder_dto_1.BookmarkandFolder),
    __param(0, (0, graphql_1.Args)('parent_folder_name')),
    __param(1, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getAllListByParentFolderName", null);
__decorate([
    (0, graphql_1.Query)(() => folder_dto_1.BookmarkandFolder),
    __param(0, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getAllListByUserId", null);
__decorate([
    (0, graphql_1.Query)(() => folder_dto_1.BookmarkandFolder),
    __param(0, (0, graphql_1.Args)('parent_folder_name')),
    __param(1, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getSharedListByParentFolderName", null);
__decorate([
    (0, graphql_1.Query)(() => folder_dto_1.BookmarkandFolder),
    __param(0, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getMyPage", null);
__decorate([
    (0, graphql_1.Query)(() => folder_dto_1.BookmarkandFolder),
    __param(0, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FolderResolver.prototype, "getSharedPage", null);
exports.FolderResolver = FolderResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [folder_service_1.FolderService,
        typeorm_1.DataSource])
], FolderResolver);
//# sourceMappingURL=folder.resolver.js.map