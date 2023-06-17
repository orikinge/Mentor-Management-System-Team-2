import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FormTemplate from './FormTemplate'

export default class FormField extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public formTemplateId: number

  @column()
  public userId: number

  @column()
  public label: string

  @column()
  public type: string

  @column()
  public options: string[]

  @column()
  public validationRules: string

  @column()
  public isRequired: boolean

  @column()
  public order: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => FormTemplate)
  public formTemplate: BelongsTo<typeof FormTemplate>
}
