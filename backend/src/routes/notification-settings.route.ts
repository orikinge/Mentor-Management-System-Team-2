import express from 'express'
import { NotificationSettingsController } from '../controller/notification-settings.controller'

const router = express.Router()

const notificationSettingsRoute = new NotificationSettingsController()

router.get('/notification-settings/:user_id', notificationSettingsRoute.getSettings)
router.put('/notification-settings/:user_id', notificationSettingsRoute.updateSettings)

export default router
