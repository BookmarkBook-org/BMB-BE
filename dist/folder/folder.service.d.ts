import { DataSource, QueryRunner } from 'typeorm';
import { Folder } from './folder.entity';
import { BookmarkandFolder, createFolderInput } from './folder.dto';
export declare class FolderService {
    private dataSource;
    constructor(dataSource: DataSource);
    getFolder(folderId: number, queryRunner: QueryRunner): Promise<Folder>;
    createFolder(createFolderInput: createFolderInput, userId: number, queryRunner: QueryRunner): Promise<string>;
    updateFolder(folderId: number, folderName: string, isShared: boolean, queryRunner: QueryRunner): Promise<string>;
    changeFolderStatus(folderId: number, queryRunner: QueryRunner): Promise<string>;
    deleteFolder(folderId: number, queryRunner: QueryRunner): Promise<string>;
    deleteAllList(userId: number, queryRunner: QueryRunner): Promise<string>;
    getAllListByParentFolderName(parentFolderName: string, userId: number, queryRunner: QueryRunner): Promise<BookmarkandFolder>;
    getAllListByUserId(userId: number, queryRunner: QueryRunner): Promise<BookmarkandFolder>;
    getSharedListByParentFolderName(parentFolderName: string, userId: number, queryRunner: QueryRunner): Promise<BookmarkandFolder>;
    getMyPage(userId: number, queryRunner: QueryRunner): Promise<BookmarkandFolder>;
    getSharedPage(userId: number, queryRunner: QueryRunner): Promise<BookmarkandFolder>;
}
