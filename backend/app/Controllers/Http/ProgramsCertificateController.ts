import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProgramCertificate from 'App/Models/ProgramsCertificate'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { DateTime } from 'luxon'

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
        .whereNull('deleted_at')
        .preload('user')
        .exec()

      const approvedCertificatesCount = approvedCertificates.length

      const pendingApproval = await ProgramCertificate.query()
        .where('is_approved', false)
        .whereNull('deleted_at')
        .preload('user')

      const pendingApprovalCount = pendingApproval.length

      const userGeneratedCertificates = await ProgramCertificate.query().where(
        'creator_id',
        user.id
      )

      const userGeneratedCertificatesCount = userGeneratedCertificates.length

      const recentCertificates = await ProgramCertificate.query()
        .orderBy('updated_at', 'desc')
        .preload('user')
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

  public async approveCertificate({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
    }

    try {
      const programCertificate = await ProgramCertificate.findByOrFail('id', params.id)
      if (!programCertificate)
        return response.status(404).send({ message: 'Program Certificate does not exist' })

      programCertificate.isApproved = true
      await programCertificate.save()

      response.ok({ message: 'Program Certificate approved successfully' })
    } catch (error) {
      response.badRequest({ message: 'server Issue' })
    }
  }

  public async declineCertificate({ auth, params, response }: HttpContextContract) {
    const user = auth.user
    if (!user || !user.isAdmin) {
      response.unauthorized({ message: 'You are not authorized to access this resource.' })
      return
    }
    try {
      const programCertificate = await ProgramCertificate.findByOrFail('id', params.id)
      if (!programCertificate)
        return response.status(404).send({ message: 'Program Certificate does not exist' })

      programCertificate.deletedAt = DateTime.local()

      programCertificate.save()
      response.status(202).send({ message: 'Program Certificate declined' })
    } catch (error) {
      response.status(204).send({ message: `invalid userId: ${params.userId}`, status: 'Error' })
    }
  }
}
