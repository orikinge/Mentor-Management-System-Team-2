import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProgramCertificate from 'App/Models/ProgramsCertificate'

export default class ProgramsCertificateController {
  async getUserCertificates({ auth, params, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    const { page, limit } = request.qs()
    try {
      const certificates = await ProgramCertificate.query()
        .where('user_id', params.userId)
        .preload('user', (query) => {
          query.select(['firstName', 'lastName'])
        })
        .paginate(page || 1, limit || 10)

      return response.status(200).json({
        status: 'success',
        message: 'User certificates fetched successfully',
        certificates,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error fetching user certificates.' })
    }
  }
}
