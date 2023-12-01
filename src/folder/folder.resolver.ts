import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { Folder } from './folder.entity';
import { BookmarkandFolder, createFolderInput } from './folder.dto';
import { FolderService } from './folder.service';

@Resolver()
export class FolderResolver {
  constructor(
    private readonly folderService: FolderService,
    private dataSource: DataSource,
  ) {}

  @Query(() => Folder)
  async getFolderInfo(@Args('folder_id') folderId: number): Promise<Folder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const folder = await this.folderService.getFolder(folderId, queryRunner);
      return folder;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async createFolder(
    @Args('create_folder_input') createFolderInput: createFolderInput,
    @Args('user_id') userId: number,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const folder = await this.folderService.createFolder(
        createFolderInput,
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return folder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async updateFolder(
    @Args('folder_id') folderId: number,
    @Args('title') title: string,
    @Args('is_shared') isShared: boolean,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const folder = await this.folderService.updateFolder(
        folderId,
        title,
        isShared,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return folder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async changeFolderStatus(
    @Args('folder_id') folderId: number,
  ): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const folder = await this.folderService.changeFolderStatus(
        folderId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return folder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async deleteFolder(@Args('folder_id') folderId: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const folder = await this.folderService.deleteFolder(
        folderId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return folder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Mutation(() => String)
  async deleteAllList(@Args('user_id') userId: number): Promise<string> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const folder = await this.folderService.deleteAllList(
        userId,
        queryRunner,
      );
      await queryRunner.commitTransaction();
      return folder;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkandFolder)
  async getAllListByParentFolderName(
    @Args('parent_folder_name') parentFolderName: string,
    @Args('user_id') userId: number,
  ): Promise<BookmarkandFolder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const list = await this.folderService.getAllListByParentFolderName(
        parentFolderName,
        userId,
        queryRunner,
      );
      return list;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkandFolder)
  async getAllListByUserId(
    @Args('user_id') userId: number,
  ): Promise<BookmarkandFolder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const list = await this.folderService.getAllListByUserId(
        userId,
        queryRunner,
      );
      return list;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkandFolder)
  async getSharedListByParentFolderName(
    @Args('parent_folder_name') parentFolderName: string,
    @Args('user_id') userId: number,
  ): Promise<BookmarkandFolder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const list = await this.folderService.getSharedListByParentFolderName(
        parentFolderName,
        userId,
        queryRunner,
      );
      return list;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkandFolder)
  async getMyPage(@Args('user_id') userId: number): Promise<BookmarkandFolder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const myPage = await this.folderService.getMyPage(userId, queryRunner);
      return myPage;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Query(() => BookmarkandFolder)
  async getSharedPage(
    @Args('user_id') userId: number,
  ): Promise<BookmarkandFolder> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      const sharedPage = await this.folderService.getSharedPage(
        userId,
        queryRunner,
      );
      return sharedPage;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
