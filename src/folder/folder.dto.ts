import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { Bookmark } from "src/bookmark/bm.entity";
import { Folder } from "./folder.entity";

@InputType()
export class createFolderInput {
    @Field({ nullable: true })
    folderName: string;

    @Field({ nullable: true })
    parentFolderName: string;

    @Field({ nullable: true })
    isShared: boolean;
}

@ObjectType()
export class BookmarkandFolder {
    @Field(() => [Folder], { nullable: true })
    folders: Folder[];

    @Field(() => [Bookmark], { nullable: true })
    bookmarks: Bookmark[];
}