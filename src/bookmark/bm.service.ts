import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { DataSource, QueryRunner } from 'typeorm';
import { Bookmark } from './bm.entity';
import { BookmarkInfo, createBookmarkInput } from './bm.dto';
import axios from 'axios';

@Injectable()
export class BookmarkService {
  constructor(private dataSource: DataSource) {}

  async createBookmark(
    createBookmarkInput: createBookmarkInput,
    userId: number,
    queryRunner: QueryRunner,
  ): Promise<any> {
    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: userId },
      });
      const bookmark = await queryRunner.manager
        .getRepository(Bookmark)
        .insert({
          title: createBookmarkInput.title,
          url: createBookmarkInput.url,
          user: user,
          parentFolderName: createBookmarkInput.parentFolderName,
        });
      return 'bookmark created';
    } catch (err) {
      throw err;
    }
  }

  async updateBookmark(
    bookmarkId: number,
    title: string,
    url: string,
    parentFolderName: string,
    queryRunner: QueryRunner,
  ): Promise<any> {
    try {
      const bookmark = await queryRunner.manager
        .getRepository(Bookmark)
        .update({ id: bookmarkId }, { title, url, parentFolderName });
      return 'bookmark updated';
    } catch (err) {
      throw err;
    }
  }

  async deleteBookmark(
    bookmarkId: number,
    queryRunner: QueryRunner,
  ): Promise<any> {
    try {
      const bookmark = await queryRunner.manager
        .getRepository(Bookmark)
        .delete({ id: bookmarkId });
      return 'bookmark deleted';
    } catch (err) {
      throw err;
    }
  }

  async getBookmarkInfo(
    bookmarkId: number,
    queryRunner: QueryRunner,
  ): Promise<BookmarkInfo> {
    try {
      const bookmark = await queryRunner.manager
        .getRepository(Bookmark)
        .findOne({ where: { id: bookmarkId } });

      if (!bookmark) {
        throw new Error('Bookmark not found');
      }

      //bookmark url to thumbnail
      const url = bookmark.url;
      let html = '';
      try {
        const response = await axios.get(url);
        html = response.data;
      } catch (error) {
        if (error.response && error.response.status === 403) {
          console.error('Access to the URL was forbidden.');
        } else {
          console.error('Error fetching the URL:', error.message);
        }

        return { title: null, imageUrl: null };
      }

     // Open Graph 에서 이미지 URL 파싱
    const ogImageMatch = html.match(
      /<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/,
    );
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);

    var ogImageUrl = ogImageMatch ? ogImageMatch[1] : null;
    var title = titleMatch ? titleMatch[1] : null;

      return { title: title, imageUrl: ogImageUrl };
    } catch (err) {
      throw err;
    }
  }
}
