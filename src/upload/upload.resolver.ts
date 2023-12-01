import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { UploadService } from './upload.service';

@Resolver()
export class UploadResolver {
    constructor(
        private readonly uploadService: UploadService,
        private dataSource: DataSource,
    ) { }
    
    @Mutation(() => String, {name: 'uploadHtmlFile'})
    async uploadHtmlFile(
        @Args({ name: 'htmlFile', type: () => GraphQLUpload }) doc: Upload,
        @Args('user_id') userId: number,
    ){
        // console.log(doc.mimetype);
        if (doc.mimetype !== 'text/html') {
            throw new Error('Uploaded file is not an HTML file.');
        }
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const file = await doc;
            const result = await this.uploadService.uploadHtmlFile(
                file,
                userId,
                queryRunner,
            );
            await queryRunner.commitTransaction();
            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}

