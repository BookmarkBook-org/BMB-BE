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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const GraphQLUpload = require("graphql-upload/GraphQLUpload.js");
const Upload = require("graphql-upload/Upload.js");
const typeorm_1 = require("typeorm");
const upload_service_1 = require("./upload.service");
let UploadResolver = class UploadResolver {
    constructor(uploadService, dataSource) {
        this.uploadService = uploadService;
        this.dataSource = dataSource;
    }
    async uploadHtmlFile(doc, userId) {
        if (doc.mimetype !== 'text/html') {
            throw new Error('Uploaded file is not an HTML file.');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const file = await doc;
            const result = await this.uploadService.uploadHtmlFile(file, userId, queryRunner);
            await queryRunner.commitTransaction();
            return result;
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
exports.UploadResolver = UploadResolver;
__decorate([
    (0, graphql_1.Mutation)(() => String, { name: 'uploadHtmlFile' }),
    __param(0, (0, graphql_1.Args)({ name: 'htmlFile', type: () => GraphQLUpload })),
    __param(1, (0, graphql_1.Args)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof Upload !== "undefined" && Upload) === "function" ? _a : Object, Number]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadHtmlFile", null);
exports.UploadResolver = UploadResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [upload_service_1.UploadService,
        typeorm_1.DataSource])
], UploadResolver);
//# sourceMappingURL=upload.resolver.js.map