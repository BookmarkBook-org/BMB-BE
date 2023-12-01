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
exports.BookmarkandFolder = exports.createFolderInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const bm_entity_1 = require("../bookmark/bm.entity");
const folder_entity_1 = require("./folder.entity");
let createFolderInput = class createFolderInput {
};
exports.createFolderInput = createFolderInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], createFolderInput.prototype, "folderName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], createFolderInput.prototype, "parentFolderName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], createFolderInput.prototype, "isShared", void 0);
exports.createFolderInput = createFolderInput = __decorate([
    (0, graphql_1.InputType)()
], createFolderInput);
let BookmarkandFolder = class BookmarkandFolder {
};
exports.BookmarkandFolder = BookmarkandFolder;
__decorate([
    (0, graphql_1.Field)(() => [folder_entity_1.Folder], { nullable: true }),
    __metadata("design:type", Array)
], BookmarkandFolder.prototype, "folders", void 0);
__decorate([
    (0, graphql_1.Field)(() => [bm_entity_1.Bookmark], { nullable: true }),
    __metadata("design:type", Array)
], BookmarkandFolder.prototype, "bookmarks", void 0);
exports.BookmarkandFolder = BookmarkandFolder = __decorate([
    (0, graphql_1.ObjectType)()
], BookmarkandFolder);
//# sourceMappingURL=folder.dto.js.map