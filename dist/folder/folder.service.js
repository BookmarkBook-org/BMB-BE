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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderService = void 0;
const common_1 = require("@nestjs/common");
const bm_entity_1 = require("../bookmark/bm.entity");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const folder_entity_1 = require("./folder.entity");
let FolderService = class FolderService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getFolder(folderId, queryRunner) {
        try {
            const folder = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .findOne({ where: { id: folderId } });
            return folder;
        }
        catch (err) {
            throw err;
        }
    }
    async createFolder(createFolderInput, userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const folder = await queryRunner.manager.getRepository(folder_entity_1.Folder).insert({
                folderName: createFolderInput.folderName,
                user: user,
                parentFolderName: createFolderInput.parentFolderName,
            });
            return 'folder created';
        }
        catch (err) {
            throw err;
        }
    }
    async updateFolder(folderId, folderName, isShared, queryRunner) {
        try {
            const folder = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .update({ id: folderId }, { folderName: folderName, isShared });
            return 'folder updated';
        }
        catch (err) {
            throw err;
        }
    }
    async changeFolderStatus(folderId, queryRunner) {
        try {
            const folder = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .findOne({ where: { id: folderId } });
            const changedShared = !folder.isShared;
            const change = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .update({ id: folderId }, { isShared: changedShared });
            return 'folder status changed';
        }
        catch (err) {
            throw err;
        }
    }
    async deleteFolder(folderId, queryRunner) {
        try {
            const folder = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .delete({ id: folderId });
            return 'folder deleted';
        }
        catch (err) {
            throw err;
        }
    }
    async deleteAllList(userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const folder = await queryRunner.manager
                .getRepository(folder_entity_1.Folder)
                .delete({ user: user });
            const bookmark = await queryRunner.manager
                .getRepository(bm_entity_1.Bookmark)
                .delete({ user: user });
            return 'all bookmark and folder deleted';
        }
        catch (err) {
            throw err;
        }
    }
    async getAllListByParentFolderName(parentFolderName, userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const folders = await queryRunner.manager.find(folder_entity_1.Folder, {
                where: { parentFolderName: parentFolderName, user: user },
            });
            const bookmarks = await queryRunner.manager.find(bm_entity_1.Bookmark, {
                where: { parentFolderName: parentFolderName, user: user },
            });
            return { folders, bookmarks };
        }
        catch (err) {
            throw err;
        }
    }
    async getAllListByUserId(userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const folders = await queryRunner.manager.find(folder_entity_1.Folder, {
                where: { user: user },
            });
            const bookmarks = await queryRunner.manager.find(bm_entity_1.Bookmark, {
                where: { user: user },
            });
            return { folders, bookmarks };
        }
        catch (err) {
            throw err;
        }
    }
    async getSharedListByParentFolderName(parentFolderName, userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const folders = await queryRunner.manager.find(folder_entity_1.Folder, {
                where: {
                    parentFolderName: parentFolderName,
                    user: user,
                    isShared: true,
                },
            });
            const bookmarks = await queryRunner.manager.find(bm_entity_1.Bookmark, {
                where: { parentFolderName: parentFolderName, user: user },
            });
            return { folders, bookmarks };
        }
        catch (err) {
            throw err;
        }
    }
    async getMyPage(userId, queryRunner) {
        try {
            return await this.getAllListByParentFolderName(null, userId, queryRunner);
        }
        catch (err) {
            throw err;
        }
    }
    async getSharedPage(userId, queryRunner) {
        try {
            return await this.getSharedListByParentFolderName(null, userId, queryRunner);
        }
        catch (err) {
            throw err;
        }
    }
};
exports.FolderService = FolderService;
exports.FolderService = FolderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], FolderService);
//# sourceMappingURL=folder.service.js.map