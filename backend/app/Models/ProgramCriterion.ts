import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Program from './Program'
import FormTemplate from './FormTemplate'

export default class ProgramCriterion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public programId: number

  @column()
  public formTemplateId: number

  @belongsTo(() => Program)
  public program: BelongsTo<typeof Program>

  @belongsTo(() => FormTemplate)
  public formTemplate: BelongsTo<typeof FormTemplate>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
