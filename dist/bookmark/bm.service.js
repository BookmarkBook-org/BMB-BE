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
exports.BookmarkService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../user/user.entity");
const typeorm_1 = require("typeorm");
const bm_entity_1 = require("./bm.entity");
const axios_1 = require("axios");
let BookmarkService = class BookmarkService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async createBookmark(createBookmarkInput, userId, queryRunner) {
        try {
            const user = await queryRunner.manager.findOne(user_entity_1.User, {
                where: { id: userId },
            });
            const bookmark = await queryRunner.manager
                .getRepository(bm_entity_1.Bookmark)
                .insert({
                title: createBookmarkInput.title,
                url: createBookmarkInput.url,
                user: user,
                parentFolderName: createBookmarkInput.parentFolderName,
            });
            return 'bookmark created';
        }
        catch (err) {
            throw err;
        }
    }
    async updateBookmark(bookmarkId, title, url, parentFolderName, queryRunner) {
        try {
            const bookmark = await queryRunner.manager
                .getRepository(bm_entity_1.Bookmark)
                .update({ id: bookmarkId }, { title, url, parentFolderName });
            return 'bookmark updated';
        }
        catch (err) {
            throw err;
        }
    }
    async deleteBookmark(bookmarkId, queryRunner) {
        try {
            const bookmark = await queryRunner.manager
                .getRepository(bm_entity_1.Bookmark)
                .delete({ id: bookmarkId });
            return 'bookmark deleted';
        }
        catch (err) {
            throw err;
        }
    }
    async getBookmarkInfo(bookmarkId, queryRunner) {
        try {
            const bookmark = await queryRunner.manager
                .getRepository(bm_entity_1.Bookmark)
                .findOne({ where: { id: bookmarkId } });
            if (!bookmark) {
                throw new Error('Bookmark not found');
            }
            const url = bookmark.url;
            let html = '';
            try {
                const response = await axios_1.default.get(url);
                html = response.data;
            }
            catch (error) {
                if (error.response && error.response.status === 403) {
                    console.error('Access to the URL was forbidden.');
                }
                else {
                    console.error('Error fetching the URL:', error.message);
                }
                return { title: null, imageUrl: null };
            }
            const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/);
            const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
            var ogImageUrl = ogImageMatch ? ogImageMatch[1] : null;
            var title = titleMatch ? titleMatch[1] : null;
            return { title: title, imageUrl: ogImageUrl };
        }
        catch (err) {
            throw err;
        }
    }
};
exports.BookmarkService = BookmarkService;
exports.BookmarkService = BookmarkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], BookmarkService);
//# sourceMappingURL=bm.service.js.map