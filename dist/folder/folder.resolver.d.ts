import { DataSource } from 'typeorm';
import { Folder } from './folder.entity';
import { BookmarkandFolder, createFolderInput } from './folder.dto';
import { FolderService } from './folder.service';
export declare class FolderResolver {
    private readonly folderService;
    private dataSource;
    constructor(folderService: FolderService, dataSource: DataSource);
    getFolderInfo(folderId: number): Promise<Folder>;
    createFolder(createFolderInput: createFolderInput, userId: number): Promise<string>;
    updateFolder(folderId: number, title: string, isShared: boolean): Promise<string>;
    changeFolderStatus(folderId: number): Promise<string>;
    deleteFolder(folderId: number): Promise<string>;
    deleteAllList(userId: number): Promise<string>;
    getAllListByParentFolderName(parentFolderName: string, userId: number): Promise<BookmarkandFolder>;
    getAllListByUserId(userId: number): Promise<BookmarkandFolder>;
    getSharedListByParentFolderName(parentFolderName: string, userId: number): Promise<BookmarkandFolder>;
    getMyPage(userId: number): Promise<BookmarkandFolder>;
    getSharedPage(userId: number): Promise<BookmarkandFolder>;
}
