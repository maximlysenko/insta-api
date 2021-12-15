import { Request } from "express";
import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get("current")
  async getCurrent(@Req() req: Request) {
    return this.userService.getByEmail(
      (req.user as { subject: string }).subject,
    );
  }
}
