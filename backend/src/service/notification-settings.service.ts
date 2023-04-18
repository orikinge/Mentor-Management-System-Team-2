import { UpdateNotificationSettingsInput } from '../model/interfaces/notification-settings.interface'
import { NotificationSettings } from '../model/notification-settings.model'

export class NotificationSettingsService {
  async getByUserId(user_id: number): Promise<NotificationSettings> {
    const settings = await NotificationSettings.findOne({ where: { user_id } })

    if (!settings) throw new Error('Notification Settings not found.')

    return settings
  }

  async update(input: UpdateNotificationSettingsInput): Promise<void> {
    const settings = await this.getByUserId(input.user_id)

    settings.generalNotifications = {
      ...settings.generalNotifications,
      ...input.generalNotifications,
    }

    settings.discussionNotifications = {
      ...settings.discussionNotifications,
      ...input.discussionNotifications,
    }

    await settings.save()
  }
}
