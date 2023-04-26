import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class BroadcastMessage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  userId: number

  @column()
  recipients: number[]

  @column()
  message: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
