import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Faq from 'App/Models/Faq'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class FaqController {
  public async index() {
    const general = await Faq.query().where('type', 'general_faq')
    const technical = await Faq.query().where('type', 'techincal_faq')
    return {
      general,
      technical,
    }
  }

  public async store(ctx: HttpContextContract) {
    try {
      const data = await ctx.request.validate({
        schema: schema.create({
          title: schema.string(),
          body: schema.string(),
          type: schema.string(),
        }),
      })
      await ctx.auth.authenticate()
      // TODO: ctx.bouncer("isAdmin") please implement bouncer for this route

      return Faq.create(data)
    } catch (error) {
      return ctx.response.badRequest(error)
    }
  }
}
