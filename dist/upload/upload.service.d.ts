import { DataSource, QueryRunner } from 'typeorm';
import * as Upload from 'graphql-upload/Upload.js';
import { FolderService } from 'src/folder/folder.service';
import { BookmarkService } from 'src/bookmark/bm.service';
export declare class UploadService {
    private dataSource;
    private folderService;
    private bookmarkService;
    constructor(dataSource: DataSource, folderService: FolderService, bookmarkService: BookmarkService);
    uploadHtmlFile(file: Upload, userId: number, queryRunner: QueryRunner): Promise<string>;
}
