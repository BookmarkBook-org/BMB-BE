import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bm.module';
import { FolderModule } from './folder/folder.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { User } from './user/user.entity';
import { Bookmark } from './bookmark/bm.entity';
import { Folder } from './folder/folder.entity';
import { ConfigModule } from '@nestjs/config';
import { RefreshToken } from './auth/refresh-token.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_SECRET,
      database: process.env.MYSQL_DATABASE,
      entities: [
        User,
        Bookmark,
        Folder,
        RefreshToken,
      ],
      synchronize: false,
      timezone: 'Z',
    }),
    UserModule,
    BookmarkModule,
    FolderModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

