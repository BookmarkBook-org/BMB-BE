import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async writeSelfIntro(
    userId: number,
    selfIntro: string,
    queryRunner: QueryRunner,
  ): Promise<any> {
    await queryRunner.manager
      .getRepository(User)
      .update({ id: userId }, { selfIntroduction: selfIntro });
    return 'self introduction updated';
  }

  async updateUserNickname(
    userId: number,
    nickname: string,
    queryRunner: QueryRunner,
  ): Promise<any> {
    await queryRunner.manager
      .getRepository(User)
      .update(
        { id: userId },
        { nickname },
      );
    return 'user nickname updated';
  }

  async deleteUser(userId: number, queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.getRepository(User).delete({ id: userId });
    console.log('user deleted');
    return 'user deleted';
  }

  async getUserInfo(userId: number, queryRunner: QueryRunner): Promise<User> {
    return await queryRunner.manager
      .getRepository(User)
      .findOne({ where: { id: userId } });
  }

  async findUserByUserId(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async getAllUserId(
    queryRunner: QueryRunner,
  ): Promise<number[]> {
    const users = await queryRunner.manager
      .getRepository(User)
      .find();
    const userIds = users.map((user) => user.id);
    return userIds;
  }

}
