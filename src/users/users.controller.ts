import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("users")
export class UsersController {

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCurrent(@Request() req) {
    return req.user;
  }
}
