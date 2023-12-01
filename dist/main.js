"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js");
const platform_express_1 = require("@nestjs/platform-express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter());
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    });
    app.use('/graphql', graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map