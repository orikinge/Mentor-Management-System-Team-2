import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProgramCertificate from 'App/Models/ProgramsCertificate'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

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

  public async createCertificate({ auth, request, response }: HttpContextContract) {
    const user = auth.user

    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const payload = await request.validate({
        schema: schema.create({
          userId: schema.number([rules.exists({ table: 'users', column: 'id' })]),
          programNameUrl: schema.string(),
          certification: schema.string(),
          logoUrl: schema.string.optional(),
          dateOfIssue: schema.date(),
          certificateId: schema.string(),
          signature: schema.string(),
          isApproved: schema.boolean.optional(),
        }),
      })
      const certificate = await ProgramCertificate.create({ ...payload, creatorId: user.id })

      return certificate
    } catch (error) {
      return response.badRequest({ message: `Error creating certificate`, status: 'error' })
    }
  }

  public async getAllApprovedCertificates({ auth, response }: HttpContextContract) {
    const user = auth.user!

    if (!user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }

    try {
      const approvedCertificates = await ProgramCertificate.query()
        .where('is_approved', true)
        .exec()
      
      const approvedCertificatesCount = approvedCertificates.length

      const pendingApproval = await ProgramCertificate.query().where('is_approved', false).where('delete_at')
        
      const pendingApprovalCount = pendingApproval.length

      const userGeneratedCertificates = 
        await ProgramCertificate.query().where('creator_id', user.id)
      
      const userGeneratedCertificatesCount = userGeneratedCertificates.length

      const recentCertificates = await ProgramCertificate.query()
        .orderBy('updated_at', 'desc')
        .limit(6)
        .exec()

      return response.ok({
        approvedCertificates,
        approvedCertificatesCount,
        pendingApproval,
        pendingApprovalCount,
        userGeneratedCertificates,
        userGeneratedCertificatesCount,
        recentCertificates,
      })
    } catch (error) {
      return response.badRequest({ message: `Error fetching certificates`, status: 'error' })
    }
  }
}
