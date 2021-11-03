import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signInDto: SignInDto) {
    // TODO: Check password. 400 for wrong creds
    return {
      access_token: this.jwtService.sign(signInDto),
    };
  }
}
