import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public senderId: number

  @column()
  public recipientId: number

  @column()
  public body: string

  
  @column.dateTime()
  public sentAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public sender: BelongsTo<typeof User>

  @belongsTo(() => User)
  public recipient: BelongsTo<typeof User>
}
