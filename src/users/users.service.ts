import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user === null) {
      throw new BadRequestException("User not found");
    }

    delete user.password;

    return user;
  }
}
