import * as Upload from 'graphql-upload/Upload.js';
import { DataSource } from 'typeorm';
import { UploadService } from './upload.service';
export declare class UploadResolver {
    private readonly uploadService;
    private dataSource;
    constructor(uploadService: UploadService, dataSource: DataSource);
    uploadHtmlFile(doc: Upload, userId: number): Promise<string>;
}
