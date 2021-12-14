import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalPipes(new ValidationPipe())
    .setGlobalPrefix("api/v1")
    .listen(parseInt(process.env.APP_PORT));
}
void bootstrap();
