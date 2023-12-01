import { Module } from '@nestjs/common';
import { BookmarkService } from './bm.service';
import { BookmarkResolver } from './bm.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './bm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  exports: [TypeOrmModule, BookmarkService],
  providers: [BookmarkService, BookmarkResolver],
})
export class BookmarkModule {}
