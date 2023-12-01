import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { BookmarkInfo, createBookmarkInput } from './bm.dto';
import { BookmarkService } from './bm.service';

@Resolver()
export class BookmarkResolver {
  constructor(
    private readonly bookmarkService: BookmarkService,
    private dataSource: DataSource,
  ) {}

  @Mutation(() => String)
  async createBookmark(
    @Args('create_bookmark_input') createBookmarkInput: createBookmarkInput,
    @Args('user_id') userId: number,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const bookmark = await this.bookmarkService.createBookmark(
        createBookmarkInput,
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return bookmark;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async updateBookmark(
    @Args('bookmark_id') bookmarkId: number,
    @Args('title') title: string,
    @Args('url') url: string,
    @Args('parent_folder_name') parentFolderName: string,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const bookmark = await this.bookmarkService.updateBookmark(
        bookmarkId,
        title,
        url,
        parentFolderName,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return bookmark;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async deleteBookmark(
    @Args('bookmark_id') bookmarkId: number,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const bookmark = await this.bookmarkService.deleteBookmark(
        bookmarkId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return bookmark;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkInfo)
  async getBookmarkInfo(
    @Args('bookmark_id') bookmarkId: number,
  ): Promise<BookmarkInfo> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const bookmark = await this.bookmarkService.getBookmarkInfo(
        bookmarkId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return bookmark;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
