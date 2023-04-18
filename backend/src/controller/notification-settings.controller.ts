import { Request, Response } from 'express'
import { NotificationSettingsService } from '../service/notification-settings.service'

export class NotificationSettingsController {
  notificationSettingsService = new NotificationSettingsService()

  getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const user_id = +req.params.user_id
      const settings = await this.notificationSettingsService.getByUserId(user_id)
      res.status(200).json(settings)
    } catch (error) {
      res.status(404).json({ message: error })
    }
  }

  updateSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const input = req.body
      await this.notificationSettingsService.update(input)
      res.status(204).send()
    } catch (error) {
      res.status(400).json({ message: error })
    }
  }
}
