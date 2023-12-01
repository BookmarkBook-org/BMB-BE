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
exports.BookmarkInfo = exports.createBookmarkInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let createBookmarkInput = class createBookmarkInput {
};
exports.createBookmarkInput = createBookmarkInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], createBookmarkInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], createBookmarkInput.prototype, "url", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], createBookmarkInput.prototype, "parentFolderName", void 0);
exports.createBookmarkInput = createBookmarkInput = __decorate([
    (0, graphql_1.InputType)()
], createBookmarkInput);
let BookmarkInfo = class BookmarkInfo {
};
exports.BookmarkInfo = BookmarkInfo;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BookmarkInfo.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BookmarkInfo.prototype, "imageUrl", void 0);
exports.BookmarkInfo = BookmarkInfo = __decorate([
    (0, graphql_1.ObjectType)()
], BookmarkInfo);
//# sourceMappingURL=bm.dto.js.map