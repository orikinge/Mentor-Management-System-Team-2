import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Task from './Task'
import User from './User'


export default class TaskMentor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public taskId: number

  @column()
  public mentorId: number

  @belongsTo(() => Task)
  public task: BelongsTo<typeof Task>

  @belongsTo(() => User)
  public mentor: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => User, {
    localKey: 'taskId',
    pivotForeignKey: 'task_id',
    relatedKey: 'mentorId',
    pivotRelatedForeignKey: 'mentor_id',
    pivotTable: 'task_mentors',
  })
  public mentors: ManyToMany<typeof User>
}
