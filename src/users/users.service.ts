import { BadRequestException, Injectable } from "@nestjs/common";
import { Author, User } from "@prisma/client";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { author: true },
    });

    if (user === null) {
      throw new BadRequestException("User not found");
    }

    return this.toUserDto(user);
  }

  private toUserDto(user: User & { author: Author }) {
    const { password, id, author: { userId, ...restAuthor }, ...rest } = user;

    return {
      ...rest,
      ...restAuthor,
    };
  }
}
