
import { Args, Query, Mutation, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private dataSource: DataSource,
    ) {}

    @Mutation(() => String)
    async writeSelfIntro(
        @Args('user_id') userId: number,
        @Args('self_intro') selfIntro: string,
    ): Promise<string> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.writeSelfIntro(
                userId,
                selfIntro,
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return user;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    @Mutation(() => String)
    async updateUserNickname(
        @Args('user_id') userId: number,
        @Args('nickname') nickname: string,
    ): Promise<string> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.updateUserNickname(
                userId,
                nickname,
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return user;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    @Mutation(() => String)
    async deleteUser(
        @Args('user_id') userId: number,
    ): Promise<string> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.deleteUser(
                userId,
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return user;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    @Query(() => User)
    async getUserInfo(
        @Args('user_id') userId: number,
    ): Promise<User> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const user = await this.userService.getUserInfo(
                userId,
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return user;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    @Query(()=> [Number])
    async getAllUserId(): Promise<number[]> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const userIds = await this.userService.getAllUserId(
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return userIds;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
