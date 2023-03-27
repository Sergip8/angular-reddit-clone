export class CommentRequest{
     text!: string
    userName!: string
    duration!: string
    position!: number
    id!: number
    commentReplyId!: number
    reply!: Array<CommentRequest>
}