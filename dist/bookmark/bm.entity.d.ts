import { User } from 'src/user/user.entity';
export declare class Bookmark {
    id: number;
    user: User;
    title: string;
    url: string;
    parentFolderName: string;
    createdAt: Date;
    updatedAt: Date;
}
