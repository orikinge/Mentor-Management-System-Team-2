import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportRequest from 'App/Models/SupportRequest'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class SupportRequestsController {
  async index({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      const requests = await SupportRequest.findBy('user_id', user?.id)
      return response.ok(requests)
    } catch (error) {
      response.badRequest({ message: `no request found`, status: 'Error' })
    }
  }

  async createRequest({ auth, request, response }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const email = auth.user?.email
      const payload = await request.validate({
        schema: schema.create({
          imageUrl: schema.file.optional({
            size: '2mb',
            extnames: ['jpg', 'png']
        }),
          email: schema.string.optional(),
          title: schema.string(),
          body: schema.string()
        })
      })
      const supportImage = request.file('imageUrl')
      await supportImage?.moveToDisk('upload_file')

      const supportRequest = await SupportRequest.create({
        ...payload,
        imageUrl: supportImage?.fileName,
        userId,
        email
      })

      return response.created({ message: 'Support request created', supportRequest})
    } catch (error) {
      response.badRequest({ message: `create request failed`, status: `${error}` })
    }
  }
}
