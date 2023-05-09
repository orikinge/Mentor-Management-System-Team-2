import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class ProgramsCertificateController {
  async getUserCertificates({ auth, params, response }: HttpContextContract) {
    const user = auth.user

    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const users = await User.query()
        .where('id', params.userId)
        .preload('programCertificates')
        .exec()
      const result = users.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        certificates: user.programCertificates?.map((certificate) => ({
          id: certificate.id,
          programName: certificate.programName,
          certification: certificate.certification,
          programLogo: certificate.logoUrl,
        })),
      }))

      return response.status(200).json({
        status: 'success',
        message: 'User certificates fetched successfully',
        result,
      })
    } catch (error) {
      return response.status(500).send({ message: 'Error fetching user certificates.' })
    }
  }
}
