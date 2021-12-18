import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class AppModule {}
