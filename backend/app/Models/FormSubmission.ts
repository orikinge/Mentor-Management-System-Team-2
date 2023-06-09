import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormSubmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public formTemplateId: number

  @column()
  public userId: number

  @column()
  public submissionData: JSON

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
