import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import User from './User'

export default class TaskReport extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public taskId: number

  @column()
  public mentorId: number

  @belongsTo(() => User, { foreignKey: 'userId' })
  public mentor: BelongsTo<typeof User>

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

  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  
}
