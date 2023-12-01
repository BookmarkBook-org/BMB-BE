import { Field, InputType, ObjectType} from "@nestjs/graphql";

@InputType()
export class createBookmarkInput {
    @Field({ nullable: true})
    title: string;

    @Field({ nullable: true })
    url: string;

    @Field({ nullable: true})
    parentFolderName: string;
}

@ObjectType()   
export class BookmarkInfo {
    @Field({ nullable: true})
    title: string;

    @Field({ nullable: true })
    imageUrl: string;
}