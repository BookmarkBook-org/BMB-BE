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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const folder_service_1 = require("../folder/folder.service");
const bm_service_1 = require("../bookmark/bm.service");
const Cheerio = require("cheerio");
let UploadService = class UploadService {
    constructor(dataSource, folderService, bookmarkService) {
        this.dataSource = dataSource;
        this.folderService = folderService;
        this.bookmarkService = bookmarkService;
    }
    async uploadHtmlFile(file, userId, queryRunner) {
        var _a, e_1, _b, _c;
        try {
            const fileStream = file.createReadStream();
            const chunks = [];
            try {
                for (var _d = true, fileStream_1 = __asyncValues(fileStream), fileStream_1_1; fileStream_1_1 = await fileStream_1.next(), _a = fileStream_1_1.done, !_a; _d = true) {
                    _c = fileStream_1_1.value;
                    _d = false;
                    const chunk = _c;
                    chunks.push(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = fileStream_1.return)) await _b.call(fileStream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const buffer = Buffer.concat(chunks);
            const html = buffer.toString('utf-8');
            const $ = Cheerio.load(html);
            const allFolders = $('H3');
            const folders = [...allFolders].slice(1);
            for (const folder of folders) {
                var folderName = $(folder).text().trim();
                var parentFolderName = $(folder).parent().parent().prev().text().trim();
                const isRookFolder = $(folder).parent().parent().prev().attr('personal_toolbar_folder');
                if (isRookFolder === 'true') {
                    parentFolderName = null;
                }
                console.log('폴더 이름 :', folderName, '상위 폴더 이름 :', parentFolderName);
                await this.folderService.createFolder({
                    folderName: folderName,
                    parentFolderName: parentFolderName,
                    isShared: true,
                }, userId, queryRunner);
            }
            const bookmarks = $('A');
            for (const bookmark of bookmarks) {
                const bookmarkName = $(bookmark).text().trim() || null;
                const bookmarkUrl = $(bookmark).attr('href');
                var parentFolderName = $(bookmark).parent().parent().prev().text().trim();
                const isRookFolder = $(bookmark).parent().parent().prev().attr('personal_toolbar_folder');
                if (isRookFolder === 'true') {
                    parentFolderName = null;
                }
                console.log('북마크 이름 :', bookmarkName, '북마크 URL :', bookmarkUrl, '상위 폴더 이름 :', parentFolderName);
                await this.bookmarkService.createBookmark({
                    title: bookmarkName,
                    url: bookmarkUrl,
                    parentFolderName: parentFolderName,
                }, userId, queryRunner);
            }
            return 'bookmark and folder uploaded success';
        }
        catch (err) {
            throw err;
        }
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        folder_service_1.FolderService,
        bm_service_1.BookmarkService])
], UploadService);
//# sourceMappingURL=upload.service.js.map