import { QueryRunner, Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    writeSelfIntro(userId: number, selfIntro: string, queryRunner: QueryRunner): Promise<any>;
    updateUserNickname(userId: number, nickname: string, queryRunner: QueryRunner): Promise<any>;
    deleteUser(userId: number, queryRunner: QueryRunner): Promise<any>;
    getUserInfo(userId: number, queryRunner: QueryRunner): Promise<User>;
    findUserByUserId(id: number): Promise<User>;
    getAllUserId(queryRunner: QueryRunner): Promise<number[]>;
}
