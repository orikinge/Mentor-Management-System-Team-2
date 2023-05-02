import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class CommentsController {
  public async createComment({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to comment' })
    }

    const postId = params.postId

    const post = await Post.find(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    const payload = await request.validate({
      schema: schema.create({
        comment: schema.string({ trim: true }, [rules.minLength(2)]),
        emoji: schema.string.optional({ trim: true }),
        imageUrl: schema.file.optional({
          size: '2mb',
          extnames: ['jpg', 'png'],
        }),
      }),
    })

    const comment = new Comment()
    comment.comment = payload.comment
    comment.emoji = payload.emoji ?? ''
    comment.userId = user.id

    if (payload.imageUrl) {
      const commentImage = request.file('imageUrl')
      await commentImage?.moveToDisk('upload_file')
      comment.imageUrl = commentImage?.fileName ?? ''
    }

    await post.related('comments').save(comment)

    return response.created({ status: 'success', message: 'Comment successfully added', comment })
  }

  public async updateComment({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to update a comment' })
    }

    const postId = params.postId
    const commentId = params.commentId

    const post = await Post.find(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    const comment = await post.related('comments').query().where('id', commentId).firstOrFail()

    if (comment.userId !== user.id) {
      return response.unauthorized({ error: 'You are not authorized to update this comment' })
    }

    const payload = await request.validate({
      schema: schema.create({
        comment: schema.string({ trim: true }, [rules.minLength(2)]),
        emoji: schema.string.optional({ trim: true }),
        imageUrl: schema.file.optional({
          size: '2mb',
          extnames: ['jpg', 'png'],
        }),
      }),
    })

    comment.comment = payload.comment
    comment.emoji = payload.emoji ?? comment.emoji

    if (payload.imageUrl) {
      const commentImage = request.file('imageUrl')
      await commentImage?.moveToDisk('upload_file')
      comment.imageUrl = commentImage?.fileName ?? comment.imageUrl
    }

    await comment.save()

    return response
      .status(200)
      .json({ status: 'success', message: 'Comment successfully updated', comment })
  }

  public async deleteComment({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to delete a comment' })
    }

    const postId = params.postId
    const commentId = params.commentId

    const comment = await Comment.query().where('post_id', postId).where('id', commentId).first()

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (comment.userId !== user.id) {
      return response.unauthorized('You are not authorized to delete this comment')
    }

    await comment.delete()

    return {
      message: 'Comment deleted successfully',
    }
  }
}
