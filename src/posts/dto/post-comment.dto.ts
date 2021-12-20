import { Comment } from "@prisma/client";

export default class PostCommentDto {
    static fromPostComment(comment: Comment): Omit<Comment, "postId"> {
        return comment;
    }
}
