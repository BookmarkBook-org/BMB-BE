import { User } from 'src/user/user.entity';
export declare class Folder {
    id: number;
    user: User;
    folderName: string;
    parentFolderName: string;
    isShared: boolean;
    createdAt: Date;
    updatedAt: Date;
}
