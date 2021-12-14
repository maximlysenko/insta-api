import * as bcrypt from "bcrypt";
import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../prisma.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {
    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: hash,
        photo: dto.photo,
      },
    });

    delete user.password;

    return user;
  }

  async signIn(signInDto: SignInDto) {
    const foundUser = await this.prisma.user.findUnique({
      where: { email: signInDto.email },
    });

    if (foundUser === null) {
      throw new BadRequestException("Email or password is incorrect");
    }

    const passwordsMatch = await bcrypt.compare(
      signInDto.password,
      foundUser.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException("Email or password is incorrect");
    }

    return {
      access_token: this.jwtService.sign(signInDto),
    };
  }
}
