import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderResolver } from './folder.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  exports: [TypeOrmModule, FolderService],
  providers: [FolderService, FolderResolver]
})
export class FolderModule {}
