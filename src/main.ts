import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { graphqlUploadExpress } from "graphql-upload";
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.use(
    '/graphql',
    graphqlUploadExpress({maxFileSize: 100000000, maxFiles: 10 })
    );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: false,
  //     transform: false,
  //   }))
  //app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
