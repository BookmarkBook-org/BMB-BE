import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { User } from './user.entity';

@InputType()
export class createUserInput {
  @Field()
  name: string;

  @Field()
  nickname: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  selfIntroduction: string;
}


