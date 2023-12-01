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
exports.BookmarkResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const bm_dto_1 = require("./bm.dto");
const bm_service_1 = require("./bm.service");
let BookmarkResolver = class BookmarkResolver {
    constructor(bookmarkService, dataSource) {
        this.bookmarkService = bookmarkService;
        this.dataSource = dataSource;
    }
    async createBookmark(createBookmarkInput, userId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const bookmark = await this.bookmarkService.createBookmark(createBookmarkInput, userId, queryRunner);
            await queryRunner.commitTransaction();
            return bookmark;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async updateBookmark(bookmarkId, title, url, parentFolderName) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const bookmark = await this.bookmarkService.updateBookmark(bookmarkId, title, url, parentFolderName, queryRunner);
            await queryRunner.commitTransaction();
            return bookmark;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteBookmark(bookmarkId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const bookmark = await this.bookmarkService.deleteBookmark(bookmarkId, queryRunner);
            await queryRunner.commitTransaction();
            return bookmark;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
    async getBookmarkInfo(bookmarkId) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const bookmark = await this.bookmarkService.getBookmarkInfo(bookmarkId, queryRunner);
            await queryRunner.commitTransaction();
            return bookmark;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.BookmarkResolver = BookmarkResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('create_bookmark_input')),
    __param(1, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bm_dto_1.createBookmarkInput, Number]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "createBookmark", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('bookmark_id')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('url')),
    __param(3, (0, graphql_1.Args)('parent_folder_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "updateBookmark", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('bookmark_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "deleteBookmark", null);
__decorate([
    (0, graphql_1.Query)(() => bm_dto_1.BookmarkInfo),
    __param(0, (0, graphql_1.Args)('bookmark_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BookmarkResolver.prototype, "getBookmarkInfo", null);
exports.BookmarkResolver = BookmarkResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [bm_service_1.BookmarkService,
        typeorm_1.DataSource])
], BookmarkResolver);
//# sourceMappingURL=bm.resolver.js.map