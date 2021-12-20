import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "src/users/users.service";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    providers: [PostsService, PrismaService, UsersService],
    controllers: [PostsController],
})
export class PostsModule {}
