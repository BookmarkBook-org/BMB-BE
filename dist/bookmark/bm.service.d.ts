import { DataSource, QueryRunner } from 'typeorm';
import { BookmarkInfo, createBookmarkInput } from './bm.dto';
export declare class BookmarkService {
    private dataSource;
    constructor(dataSource: DataSource);
    createBookmark(createBookmarkInput: createBookmarkInput, userId: number, queryRunner: QueryRunner): Promise<any>;
    updateBookmark(bookmarkId: number, title: string, url: string, parentFolderName: string, queryRunner: QueryRunner): Promise<any>;
    deleteBookmark(bookmarkId: number, queryRunner: QueryRunner): Promise<any>;
    getBookmarkInfo(bookmarkId: number, queryRunner: QueryRunner): Promise<BookmarkInfo>;
}
