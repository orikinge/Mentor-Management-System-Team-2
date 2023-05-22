import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Program from './Program'

export default class ProgramReport extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programId: number

  @column()
  public mentorManagerId: number

  @belongsTo(() => User, { foreignKey: 'userId' })
  public mentorManager: BelongsTo<typeof User>

  @column()
  public achievement: string

  @column()
  public blocker: string

  @column()
  public recommendation: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Program)
  public program: BelongsTo<typeof Program>
}
