import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { SignUpDto } from "./dto/sign-up.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-in")
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @Post("sign-up")
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }
}
