import { BadRequestException, PipeTransform } from "@nestjs/common";

export default class ImageFilesPipe implements PipeTransform {
    transform(value: Express.Multer.File) {
        if (!value.mimetype.startsWith("image/")) {
            throw new BadRequestException(`'${value.mimetype}' mime type is not supported`);
        }

        return value;
    }
}
