import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Bookmark } from 'src/bookmark/bm.entity';
import { Folder } from 'src/folder/folder.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String, { nullable: true })
  name: string;

  @Column()
  @Field(() => String, { nullable: true })
  nickname: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  googleId: string;

  @Column()
  @Field(() => String, { nullable: true })
  selfIntroduction: string;

  @OneToMany(() => Bookmark, (bookmark) => bookmark.user, { cascade: true })
  Bookmarks: Bookmark[];

  @OneToMany(() => Folder, (folder) => folder.user, { cascade: true })
  Folders: Folder[];

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;
}
