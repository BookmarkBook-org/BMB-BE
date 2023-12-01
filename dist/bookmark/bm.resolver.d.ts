import { DataSource } from 'typeorm';
import { BookmarkInfo, createBookmarkInput } from './bm.dto';
import { BookmarkService } from './bm.service';
export declare class BookmarkResolver {
    private readonly bookmarkService;
    private dataSource;
    constructor(bookmarkService: BookmarkService, dataSource: DataSource);
    createBookmark(createBookmarkInput: createBookmarkInput, userId: number): Promise<string>;
    updateBookmark(bookmarkId: number, title: string, url: string, parentFolderName: string): Promise<string>;
    deleteBookmark(bookmarkId: number): Promise<string>;
    getBookmarkInfo(bookmarkId: number): Promise<BookmarkInfo>;
}
