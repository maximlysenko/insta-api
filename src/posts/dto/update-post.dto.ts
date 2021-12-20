import { IsNotEmpty } from "class-validator";

export default class UpdatePostDto {
    @IsNotEmpty()
    text: string;
}
