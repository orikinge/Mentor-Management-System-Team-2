import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NotificationSetting from 'App/Models/NotificationSetting'

export default class NotificationSettingsController {
  async getUserNotificationSettings({ auth, response }: HttpContextContract) {
    try {
      const user = auth.user
      const notificationSettings = await NotificationSetting.findBy('user_id', user)
      return response.json(notificationSettings ? notificationSettings : {})
    } catch (error) {
      response.unauthorized({ message: 'No Permissions', status: 'Error' })
    }
  }

  async updateUserNotificationSettings({ auth, request, response }) {
    try {
      const user = await auth.user
      const notificationSettings = await NotificationSetting.findBy('user_id', user)

      if (notificationSettings) {
        notificationSettings.settings = Object.assign(
          notificationSettings.settings,
          request.only([
            'general.notifications.all.push',
            'general.notifications.all.email',
            'general.notifications.programs.push',
            'general.notifications.programs.email',
            'general.notifications.tasks.push',
            'general.notifications.tasks.email',
            'general.notifications.approval_requests.push',
            'general.notifications.approval_requests.email',
            'general.notifications.reports.push',
            'general.notifications.reports.email',
            'discussion.notifications.comments_on_post.push',
            'discussion.notifications.comments_on_post.email',
            'discussion.notifications.posts.push',
            'discussion.notifications.posts.email',
            'discussion.notifications.comments.push',
            'discussion.notifications.comments.email',
            'discussion.notifications.mentions.push',
            'discussion.notifications.mentions.email',
            'discussion.notifications.direct_message.push',
            'discussion.notifications.direct_message.email',
          ])
        )
        await notificationSettings.save()
      }
      return response.json(notificationSettings ? notificationSettings.settings : {})
    } catch (error) {
      response.unauthorized({ message: 'No Permissions', status: 'Error' })
    }
  }
}
