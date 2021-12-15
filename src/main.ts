import * as helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableVersioning({ defaultVersion: "1", type: VersioningType.URI });
  await app
    .use(helmet())
    .useGlobalPipes(new ValidationPipe())
    .setGlobalPrefix("api")
    .listen(parseInt(process.env.APP_PORT));
}
void bootstrap();
