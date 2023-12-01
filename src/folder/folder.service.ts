import { Injectable } from '@nestjs/common';
import { Bookmark } from 'src/bookmark/bm.entity';
import { User } from 'src/user/user.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { Folder } from './folder.entity';
import { BookmarkandFolder, createFolderInput } from './folder.dto';

@Injectable()
export class FolderService {
  constructor(private dataSource: DataSource) {}

  async getFolder(folderId: number, queryRunner: QueryRunner): Promise<Folder> {
    try {
      const folder = await queryRunner.manager
        .getRepository(Folder)
        .findOne({ where: { id: folderId } });
      return folder;
    } catch (err) {
      throw err;
    }
  }

  async createFolder(
    createFolderInput: createFolderInput,
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<string> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const folder = await queryRunner.manager.getRepository(Folder).insert({
        folderName: createFolderInput.folderName,
        user: user,
        parentFolderName: createFolderInput.parentFolderName,
      });
      return 'folder created';
    } catch (err) {
      throw err;
    }
  }

  async updateFolder(
    folderId: number,
    folderName: string,
    isShared: boolean,
    queryRunner: QueryRunner,
  ): Promise<string> {
    try {
      const folder = await queryRunner.manager
        .getRepository(Folder)
        .update(
          { id: folderId },
          { folderName: folderName, isShared },
        );
      return 'folder updated';
    } catch (err) {
      throw err;
    }
  }

  async changeFolderStatus(
    folderId: number,
    queryRunner: QueryRunner,
  ): Promise<string> {
    try {
      const folder = await queryRunner.manager
        .getRepository(Folder)
        .findOne({ where: { id: folderId } });
      const changedShared = !folder.isShared;
      const change = await queryRunner.manager
        .getRepository(Folder)
        .update({ id: folderId }, { isShared: changedShared });
      return 'folder status changed';
    } catch (err) {
      throw err;
    }
  }

  async deleteFolder(
    folderId: number,
    queryRunner: QueryRunner,
  ): Promise<string> {
    try {
      const folder = await queryRunner.manager
        .getRepository(Folder)
        .delete({ id: folderId });
      return 'folder deleted';
    } catch (err) {
      throw err;
    }
  }

  async deleteAllList(
    userId: number,
    queryRunner: QueryRunner,
  ) : Promise<string> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const folder = await queryRunner.manager
        .getRepository(Folder)
        .delete({ user: user });

      const bookmark = await queryRunner.manager
        .getRepository(Bookmark)
        .delete({ user: user });
        
      return 'all bookmark and folder deleted';
    } catch (err) {
      throw err;
    }
  }

  async getAllListByParentFolderName(
    parentFolderName: string,
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkandFolder> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const folders: Folder[] = await queryRunner.manager.find(Folder, {
        where: { parentFolderName: parentFolderName, user: user },
      });
      const bookmarks: Bookmark[] = await queryRunner.manager.find(Bookmark, {
        where: { parentFolderName: parentFolderName, user: user },
      });
      return { folders, bookmarks };
    } catch (err) {
      throw err;
    }
  }

  async getAllListByUserId(
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkandFolder> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const folders: Folder[] = await queryRunner.manager.find(Folder, {
        where: { user: user },
      });
      const bookmarks: Bookmark[] = await queryRunner.manager.find(Bookmark, {
        where: { user: user },
      });
      return { folders, bookmarks };
    } catch (err) {
      throw err;
    }
  }

  async getSharedListByParentFolderName(
    parentFolderName: string,
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkandFolder> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const folders: Folder[] = await queryRunner.manager.find(Folder, {
        where: {
          parentFolderName: parentFolderName,
          user: user,
          isShared: true,
        },
      });
      const bookmarks: Bookmark[] = await queryRunner.manager.find(Bookmark, {
        where: { parentFolderName: parentFolderName, user: user },
      });
      return { folders, bookmarks };
    } catch (err) {
      throw err;
    }
  }

  async getMyPage(
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkandFolder> {
    try {
      return await this.getAllListByParentFolderName(null, userId, queryRunner);
    } catch (err) {
      throw err;
    }
  }

  async getSharedPage(
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkandFolder> {
    try {
      return await this.getSharedListByParentFolderName(
        null,
        userId,
        queryRunner,
      );
    } catch (err) {
      throw err;
    }
  }
}
