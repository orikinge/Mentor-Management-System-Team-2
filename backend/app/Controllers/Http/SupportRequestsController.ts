import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SupportRequest from 'App/Models/SupportRequest'

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
      const user_id = auth.user?.id
      const { email, title, body } = request.only(['email', 'title', 'body'])

      const supportRequest = new SupportRequest()
      supportRequest.fill({ user_id, email, title, body })

      await supportRequest.save()
      return response.created({ message: 'Support request created', ...supportRequest.$attributes })
    } catch (error) {
      response.badRequest({ message: `create request failed`, status: 'Error' })
    }
  }
}
