import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import * as Upload from 'graphql-upload/Upload.js';
import { FolderService } from 'src/folder/folder.service';
import { BookmarkService } from 'src/bookmark/bm.service';
import * as Cheerio from 'cheerio';

@Injectable()
export class UploadService {

    constructor(
        private dataSource: DataSource,
        private folderService: FolderService,
        private bookmarkService: BookmarkService,
    ) {}
    
    async uploadHtmlFile(
        file: Upload,
        userId: number,
        queryRunner: QueryRunner,
    ): Promise<string> {
        try{
            const fileStream = file.createReadStream();
            const chunks = [];

            for await (const chunk of fileStream) {
                chunks.push(chunk);
            }

            const buffer = Buffer.concat(chunks);
            const html = buffer.toString('utf-8');
            const $ = Cheerio.load(html);

            const allFolders = $('H3');
            const folders = [...allFolders].slice(1);


            for(const folder of folders){ 
                var folderName = $(folder).text().trim();
                var parentFolderName = $(folder).parent().parent().prev().text().trim();
                const isRookFolder = $(folder).parent().parent().prev().attr('personal_toolbar_folder');

                if(isRookFolder === 'true'){
                    parentFolderName = null;
                }
                //check is rook Folder
                console.log(
                    '폴더 이름 :', folderName,
                    '상위 폴더 이름 :', parentFolderName,
                )
                await this.folderService.createFolder({
                    folderName: folderName,
                    parentFolderName: parentFolderName,
                    isShared: true,
                }, userId, queryRunner);
            }

            const bookmarks = $('A');

            for(const bookmark of bookmarks){
                const bookmarkName = $(bookmark).text().trim() || null;
                const bookmarkUrl = $(bookmark).attr('href');
                var parentFolderName = $(bookmark).parent().parent().prev().text().trim();

                const isRookFolder = $(bookmark).parent().parent().prev().attr('personal_toolbar_folder');

                if(isRookFolder === 'true'){
                    parentFolderName = null;
                }
                console.log(
                    '북마크 이름 :', bookmarkName,
                    '북마크 URL :', bookmarkUrl,
                    '상위 폴더 이름 :', parentFolderName,
                )
                await this.bookmarkService.createBookmark({
                    title: bookmarkName,
                    url: bookmarkUrl,
                    parentFolderName: parentFolderName,
                }, userId, queryRunner);
            }
            return 'bookmark and folder uploaded success';
        } catch (err) {
            throw err;
        }
    }
        
}
