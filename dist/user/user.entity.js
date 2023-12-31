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
exports.User = void 0;
const graphql_1 = require("@nestjs/graphql");
const bm_entity_1 = require("../bookmark/bm.entity");
const folder_entity_1 = require("../folder/folder.entity");
const typeorm_1 = require("typeorm");
let User = class User {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], User.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", String)
], User.prototype, "selfIntroduction", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bm_entity_1.Bookmark, (bookmark) => bookmark.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "Bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => folder_entity_1.Folder, (folder) => folder.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "Folders", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], User);
//# sourceMappingURL=user.entity.js.map