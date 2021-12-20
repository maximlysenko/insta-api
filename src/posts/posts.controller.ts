import { Request } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import CreatePostDto from "./dto/create-post.dto";
import { PostsService } from "./posts.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import UpdatePostDto from "./dto/update-post.dto";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAll(
    @Query()
    { page = "0", pageSize = "25" }: { page?: string; pageSize?: string },
  ) {
    return this.postsService.getAllPosts({
      page: Number(page),
      pageSize: Number(pageSize),
    });
  }

  @Post()
  async create(@Req() request: Request, @Body() dto: CreatePostDto) {
    return this.postsService.createPost(
      dto,
      (request.user as { subject: string }).subject,
    );
  }

  @Patch(":postId")
  async updateText(
    @Req() request: Request,
    @Param("postId") postId: string,
    @Body() dto: UpdatePostDto,
  ) {
    return this.postsService.updatePostText(
      postId,
      dto.text,
      (request.user as { subject: string }).subject,
    );
  }

  @Delete(":postId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Req() request: Request, @Param("postId") postId: string) {
    await this.postsService.deletePost(
      postId,
      (request.user as { subject: string }).subject,
    );
  }
}
