import { Express } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import ImageFilesPipe from "./image-files.pipe";

@Controller("media")
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @Post("upload")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ImageFilesPipe())
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    await this.mediaService.upload(file);

    return { id: file.originalname };
  }
}
