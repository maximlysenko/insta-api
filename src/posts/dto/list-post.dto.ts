import { Author, Post } from "@prisma/client";
import AuthorPostDto from "./post-author.dto";

export type ListPostDtoType = Omit<Post, "authorId" | "author"> & {
  likesCount: number;
  author: Omit<Author, "userId">;
};

export default class ListPostDto {
  static fromPost(
    post: Post & { author: Author; _count: { likes: number } },
  ): ListPostDtoType {
    const { _count, authorId, ...restPost } = post;

    return {
      ...restPost,
      likesCount: _count.likes,
      author: AuthorPostDto.fromPostAuthor(post.author),
      image: post.image ? `${process.env.AZURE_IMAGE_BASE_URL}/${post.image}` : null,
    };
  }
}
