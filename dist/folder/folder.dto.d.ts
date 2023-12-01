import { Bookmark } from "src/bookmark/bm.entity";
import { Folder } from "./folder.entity";
export declare class createFolderInput {
    folderName: string;
    parentFolderName: string;
    isShared: boolean;
}
export declare class BookmarkandFolder {
    folders: Folder[];
    bookmarks: Bookmark[];
}
