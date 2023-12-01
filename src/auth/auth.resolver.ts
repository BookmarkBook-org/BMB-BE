import { UseGuards } from '@nestjs/common';
import { Context, Int, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { IContext } from './auth.interface';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './gaurd/gaurd';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private dataSource: DataSource,
    ) {}
  @UseGuards(GqlAuthGuard('jwt'))
  @Query(() => Int)
  async getUserId(@Context() context: IContext): Promise<any> {
    return context.req.user.userId;
  }
}
