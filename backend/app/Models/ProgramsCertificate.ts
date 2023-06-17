import { DateTime } from 'luxon'
import User from './User'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'

export default class ProgramCertificate extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public creatorId: number

  @column()
  public userId: number

  @column()
  public programNameUrl: string

  @column()
  public certification: string

  @column()
  public logoUrl: string

  @column()
  public dateOfIssue: DateTime

  @column()
  public certificateId: string

  @column()
  public signature: string

  @column()
  public isApproved: boolean

  @column()
  public deletedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
