import { Injectable, NotFoundException } from "@nestjs/common";
import { Author, Post } from "@prisma/client";
import { PaginatedRequestDto } from "src/common/paginated-request.dto";
import { PaginatedDto } from "src/common/paginated.dto";
import { UsersService } from "src/users/users.service";
import { PrismaService } from "../prisma.service";
import CreatePostDto from "./dto/create-post.dto";
import ListPostDto, { ListPostDtoType } from "./dto/list-post.dto";

@Injectable()
export class PostsService {
  constructor(
    private dbClient: PrismaService,
    private userService: UsersService,
  ) {}

  async createPost(dto: CreatePostDto, email: string) {
    const user = await this.userService.getByEmail(email);
    const createdPost = await this.dbClient.post.create({
      data: {
        text: dto.text,
        image: dto.image,
        authorId: user.id,
      },
      include: {
        author: true,
        comments: true,
        _count: {
          select: { likes: true },
        },
      },
    });

    return ListPostDto.fromPost(createdPost);
  }

  async updatePostText(id: Post["id"], text: string, email: string) {
    const foundPost = await this.findUserFirst(id, email);
    
    if (!foundPost) {
      throw new NotFoundException(`Post with id '${id}' was not found`);
    }
    
    const updatedPost = await this.dbClient.post.update({
      where: {
        id,
      },
      include: {
        author: true,
        comments: true,
        _count: {
          select: { likes: true },
        },
      },
      data: {
        text,
      },
    });

    return ListPostDto.fromPost(updatedPost);
  }

  async deletePost(id: Post["id"], email: string) {
    const foundPost = await this.findUserFirst(id, email);

    if (!foundPost) {
      throw new NotFoundException(`Post with id '${id}' was not found`);
    }

    return this.dbClient.post.delete({
      where: {
        id,
      },
    });
  }

  async getAllPosts(
    dto: PaginatedRequestDto,
  ): Promise<PaginatedDto<ListPostDtoType>> {
    const [data, totalElements] = await this.dbClient.$transaction([
      this.dbClient.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: dto.pageSize,
        skip: dto.page * dto.pageSize,
        include: {
          author: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            take: 3,
            select: {
              id: true,
              text: true,
              authorId: true,
              updatedAt: true,
            },
          },
          _count: {
            select: { likes: true },
          },
        },
      }),
      this.dbClient.post.count(),
    ]);

    return this.toPaginatedPostsDto(data, totalElements);
  }


  private async findUserFirst(id: Post["id"], email: string) {
    return await this.dbClient.post.findFirst({
      where: {
        AND: {
          id,
          author: {
            user: {
              email,
            },
          },
        },
      },
    });
  }

  private toPaginatedPostsDto(
    data: (Post & { author: Author; _count: { likes: number } })[],
    totalElements: number,
  ): PaginatedDto<ListPostDtoType> {
    return {
      data: data.map(ListPostDto.fromPost),
      totalElements,
    };
  }
}
