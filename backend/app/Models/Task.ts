import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import TaskMentor from './TaskMentor'
import TaskMentorManager from './TaskMentorManager'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public meta: string

  @column()
  public userId: number

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column.dateTime()
  public deletedAt: DateTime | null

  @column()
  public typeOfReport: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => TaskMentor)
  public taskMentors: HasMany<typeof TaskMentor>

  @hasMany(() => TaskMentorManager)
  public taskMentorManagers: HasMany<typeof TaskMentorManager>

  
  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'task_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'mentor_id',
    pivotTable: 'task_mentors',
  })
  public mentors: ManyToMany<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'task_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'mentor_manager_id',
    pivotTable: 'task_mentor_managers',
  })
  public mentorManagers: ManyToMany<typeof User>




}
