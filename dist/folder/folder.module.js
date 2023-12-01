"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FolderModule = void 0;
const common_1 = require("@nestjs/common");
const folder_service_1 = require("./folder.service");
const folder_resolver_1 = require("./folder.resolver");
const typeorm_1 = require("@nestjs/typeorm");
const folder_entity_1 = require("./folder.entity");
let FolderModule = class FolderModule {
};
exports.FolderModule = FolderModule;
exports.FolderModule = FolderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([folder_entity_1.Folder])],
        exports: [typeorm_1.TypeOrmModule, folder_service_1.FolderService],
        providers: [folder_service_1.FolderService, folder_resolver_1.FolderResolver]
    })
], FolderModule);
//# sourceMappingURL=folder.module.js.map