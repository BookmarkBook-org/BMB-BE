import { Bookmark } from 'src/bookmark/bm.entity';
import { Folder } from 'src/folder/folder.entity';
export declare class User {
    id: number;
    name: string;
    nickname: string;
    email: string;
    googleId: string;
    selfIntroduction: string;
    Bookmarks: Bookmark[];
    Folders: Folder[];
    createdAt: Date;
    updatedAt: Date;
}
