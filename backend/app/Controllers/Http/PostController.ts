import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async createPost({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to create a report' })
    }

    const payload = await request.validate({
      schema: schema.create({
        imageUrl: schema.file({
          size: '2mb',
          extnames: ['jpg', 'png'],
        }),
        title: schema.string(),
        description: schema.string(),
        emoji: schema.string(),
      }),
    })
    const postImage = request.file('imageUrl')
    // Written to the "images" directory
    await postImage?.moveToDisk('upload_file')

    const post = await Post.create({
      ...payload,
      imageUrl: postImage?.fileName,
      userId: user.id,
    })

    return response.created({ status: 'success', message: 'Post successfully created', post })
  }

  public async updatePost({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to create a report' })
    }

    const postId = params.postId

    const post = await Post.find(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    if (post.userId !== user.id) {
      return response.unauthorized({ error: 'You are not authorized to edit this post' })
    }

    post.title = request.input('title')
    post.description = request.input('description')
    post.emoji = request.input('emoji')?.toString() || ''
    post.imageUrl = request.input('imageUrl')?.toString() || ''
    await post.save()

    return response
      .status(201)
      .json({ status: 'success', message: 'Post updated successfully', post })
  }

  public async getAllPosts({ auth, request, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to create a report' })
    }
    const { page, limit, search } = request.qs()

    const query = Post.query()
      .preload('user', (query) => {
        query.select(['firstName', 'lastName'])
      })
      .orderBy('created_at', 'desc')
    if (search) {
      query.where('title', 'like', `%${search}%`)
    }

    console.log(query)

    const posts = await query.paginate(page || 1, limit || 10)

    return response.ok({ status: 'success', message: 'Posts fetched successfully', posts })
  }

  public async getPostWithComments({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to create a report' })
    }

    const postId = params.postId

    const post = await Post.query()
      .preload('comments', (query) => {
        query.orderBy('created_at', 'desc').preload('user', (query) => {
          query.select('id', 'firstName', 'lastName')
        })
      })
      .where('id', postId)
      .first()

    if (!post) {
      throw new Error('Post not found')
    }

    return response.ok({
      status: 'success',
      message: 'Post with comments fetched successfully',
      post,
    })
  }

  public async deletePost({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user) {
      return response.unauthorized({ error: 'You must be logged in to create a report' })
    }
    const postId = params.postId

    const post = await Post.find(postId)
    if (!post) {
      throw new Error('Post not found')
    }

    if (post.userId !== user.id) {
      return response.unauthorized({ error: 'You are not authorized to delete this post' })
    }

    await post.delete()

    return {
      message: 'Post deleted successfully',
    }
  }
}
