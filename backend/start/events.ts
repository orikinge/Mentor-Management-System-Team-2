import Event from '@ioc:Adonis/Core/Event'

Event.on('send:notification','Notify.onSendNotification')
