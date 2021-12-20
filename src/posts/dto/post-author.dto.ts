import { Author } from "@prisma/client";

export default class AuthorPostDto {
  static fromPostAuthor({ userId, ...author }: Author): Omit<Author, "userId"> {
    return author;
  }
}
