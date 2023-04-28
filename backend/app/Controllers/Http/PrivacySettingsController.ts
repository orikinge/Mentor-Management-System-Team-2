import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PrivacySetting from 'App/Models/PrivacySetting'

export default class PrivacySettingsController {
  async getUserPrivacySettings({ auth, response }: HttpContextContract) {
    try {
      if(auth.user?.id){
      const userId = auth.user.id
      const privacySettings = await PrivacySetting.findBy('user_id', userId)
      if (!privacySettings?.userId) {
        const createSettings = new PrivacySetting()
        createSettings.userId = userId
        return await createSettings?.save()
      }
      return response.json(privacySettings ? privacySettings : {})
    }
    } catch (error) {
      response.unauthorized({ message: 'No Permissions', status: 'Error' })
    }
  }

  async updateUserPrivacySettings({ auth, request, response }) {
    try {
      const user = await auth.user.id
      const privacySettings = await PrivacySetting.findBy('user_id', user)

      if (privacySettings) {
        privacySettings.settings = Object.assign(
          privacySettings.settings,
          request.only([
            'privacy.show_contact_info',
            'privacy.show_github',
            'privacy.show_instagram',
            'privacy.show_linkedin',
            'privacy.show_twitter',
          ])
        )

        await privacySettings.save()
        return response.json(privacySettings ? privacySettings.settings : {})
      }
    } catch (error) {
      response.unauthorized({ message: 'No Permissions', status: 'Error' })
    }
  }
}
