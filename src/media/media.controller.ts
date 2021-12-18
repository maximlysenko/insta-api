import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { MediaService } from "./media.service";
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

@Controller("media")
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post("upload")
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    await this.mediaService.upload(file);

    return { id: file.originalname };
  }
}
