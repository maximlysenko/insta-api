import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MediaController } from "./media/media.controller";
import { MediaService } from "./media/media.service";
import { PostsService } from "./posts/posts.service";
import { PostsModule } from "./posts/posts.module";
import { MediaModule } from "./media/media.module";
import { PrismaService } from "./prisma.service";

@Module({
  providers: [PrismaService],
  imports: [AuthModule, UsersModule, PostsModule, MediaModule],
})
export class AppModule {}
