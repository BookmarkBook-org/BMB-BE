import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadResolver } from './upload.resolver';
import { BookmarkService } from 'src/bookmark/bm.service';
import { FolderService } from 'src/folder/folder.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from 'src/bookmark/bm.entity';
import { Folder } from 'src/folder/folder.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bookmark, Folder]),
    ],
  exports: [TypeOrmModule],
  providers: [UploadService, UploadResolver, BookmarkService, FolderService]
})

export class UploadModule {}
