import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
export declare class UserResolver {
    private readonly userService;
    private dataSource;
    constructor(userService: UserService, dataSource: DataSource);
    writeSelfIntro(userId: number, selfIntro: string): Promise<string>;
    updateUserNickname(userId: number, nickname: string): Promise<string>;
    deleteUser(userId: number): Promise<string>;
    getUserInfo(userId: number): Promise<User>;
    getAllUserId(): Promise<number[]>;
}
