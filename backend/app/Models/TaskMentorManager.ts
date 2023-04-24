import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import User from './User'


export default class TaskMentorManager extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public taskId: number

  @column()
  public mentorManagerId: number

  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  @belongsTo(() => User)
  public mentorManager: BelongsTo<typeof User>

  @manyToMany(() => User, {
    localKey: 'taskId',
    pivotForeignKey: 'task_id',
    relatedKey: 'mentorManagerId',
    pivotRelatedForeignKey: 'mentor_manager_id',
    pivotTable: 'task_mentor_managers',
  })
  public mentorManagers: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
