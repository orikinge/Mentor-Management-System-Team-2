import type { EventsList } from '@ioc:Adonis/Core/Event'
import Notification from 'App/Models/Notification'

export default class Notify {
  public async onSendNotification(notification: EventsList['send:notification']) {
    const newNotification = new Notification()
    newNotification.fill({ ...notification })
    await newNotification.save()
    console.log(JSON.stringify(notification))
  }
}
