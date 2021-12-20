import { IsNotEmpty } from "class-validator";

export default class CreatePostDto {
    @IsNotEmpty()
    text: string;
    @IsNotEmpty()
    image: string;
}
