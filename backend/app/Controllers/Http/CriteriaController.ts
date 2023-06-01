import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FormField from 'App/Models/FormField'
import FormTemplate from 'App/Models/FormTemplate'

export default class CriteriaController {
  public async index({ auth, request, response }: HttpContextContract) {
    try {
      const { page, limit } = request.qs()
      const user = auth.user
      if (!user?.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }
      const criteria = await FormTemplate.query()
        .preload('formFields')
        .select('*')
        .paginate(page || 1, limit || 10)

      return response.ok({
        success: true,
        message: 'Criteria retrieved successfully',
        criteria,
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'Failed to retrieve criteria',
        error: error.message,
      })
    }
  }

  public async createCriteria({ auth, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user?.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }
      const { title, description, form_fields } = request.only([
        'title',
        'description',
        'form_fields',
      ])

        const formTemplate = new FormTemplate()

        formTemplate.fill({
          title,
          description,
          userId: user.id
        })

        await formTemplate.save()

        if (form_fields && form_fields.length > 0) {
          const formFields = form_fields.map((formField) => ({
            ...formField,
            formTemplateId: formTemplate.id,
            userId: user.id
          }))

          await FormField.createMany(formFields)
        }


      return response.created({ message: 'Criterion Created' })
    } catch (error) {
      response.badRequest({
        message: 'Criterion creation failed',
        error,
      })
    }
  }

  public async updateCriteria({ auth, params, request, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user?.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }
      const { title, description, form_fields } = request.only([
        'title',
        'description',
        'form_fields',
      ])

        const formTemplate = await FormTemplate.findBy('id', params.id)
        if (formTemplate) {
          formTemplate.title = title ?? formTemplate.title
          formTemplate.description = description ?? formTemplate.description
          formTemplate.userId = user.id ?? formTemplate.userId

          await formTemplate.save()

          await FormField.query().where('formTemplateId', formTemplate.id).delete()

          if (form_fields && form_fields.length > 0) {
            const formFields = form_fields.map((formField) => ({
              ...formField,
              formTemplateId: formTemplate.id,
              userId: user.id
            }))

            await FormField.createMany(formFields)
          }
        }


      return response.created({ message: 'Criterion updated' })
    } catch (error) {
      response.badRequest({
        message: 'Criterion update failed',
        error,
      })
    }
  }

  public async show({ auth, params, response }: HttpContextContract) {
    try {
      const user = auth.user
      if (!user?.isAdmin) {
        return response.unauthorized({ error: 'You must be an admin to view program reports' })
      }
      const criterion = await FormTemplate.query().where('id', params.id).preload('formFields').exec()

      return response.ok({
        success: true,
        message: 'criterion retrieved successfully',
        criterion,
      })
    } catch (error) {
      return response.badRequest({
        success: false,
        message: 'criterion retrieve failed',
        error,
      })
    }
  }
}
