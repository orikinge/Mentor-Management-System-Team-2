import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  hasMany,
  HasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import UserProgram from './UserProgram'
import ProgramReport from './ProgramReport'
import ProgramCriterion from './ProgramCriterion'
import FormTemplate from './FormTemplate'

export default class Program extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public gravatar: string

  @column()
  public isArchive: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => UserProgram)
  public userPrograms: HasMany<typeof UserProgram>

  @hasMany(() => ProgramCriterion)
  public programCriteria: HasMany<typeof ProgramCriterion>

  @hasMany(() => ProgramReport)
  public programReports: HasMany<typeof ProgramReport>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'program_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_programs',
  })
  public programUsers: ManyToMany<typeof User>

  @manyToMany(() => FormTemplate, {
    localKey: 'id',
    pivotForeignKey: 'program_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'form_template_id',
    pivotTable: 'program_criteria',
  })
  public criteria: ManyToMany<typeof FormTemplate>

  @column.dateTime()
  public startDate: DateTime

  @column.dateTime()
  public endDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public users?: any
}
