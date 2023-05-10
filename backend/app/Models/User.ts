import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
  computed,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Roles from 'App/Enums/Roles'
import TaskMentor from './TaskMentor'
import TaskMentorManager from './TaskMentorManager'
import Task from './Task'
import TaskReport from './TaskReport'
import TechnicalProficiency from './TechnicalProficiency'
import PreviousProgram from './PreviousProgram'
import PreviousRole from './PreviousRole'
import Document from './Document'
import ProgramCertificate from './ProgramsCertificate'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public roleId: number

  @column()
  public email: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public meta: string

  @column()
  public bio: string

  @column()
  public website: string

  @column()
  public city: string

  @column()
  public country: string

  @column()
  public profileImagePath: string

  @column()
  public socialMediaLinks: string

  @column()
  public newProgramAvailability: string

  @column()
  public programOfInterest: string

  @column()
  public beenAMentor: string

  @column()
  public yearsOfTechnical: string

  @column({ serializeAs: null })
  public password: string

  @hasMany(() => TaskMentor, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public taskMentors: HasMany<typeof TaskMentor>

  @hasMany(() => TaskMentorManager, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public taskMentorManagers: HasMany<typeof TaskMentorManager>

  @hasMany(() => TaskReport, {
    foreignKey: 'userId',
    localKey: 'id',
  })
  public taskReport: HasMany<typeof TaskReport>

  @hasMany(() => User, { foreignKey: 'id' })
  public userId: HasMany<typeof User>

  @hasMany(() => TechnicalProficiency)
  public technicalProficiencies: HasMany<typeof TechnicalProficiency>

  @hasMany(() => PreviousProgram)
  public previousPrograms: HasMany<typeof PreviousProgram>

  @hasMany(() => PreviousRole)
  public previousRoles: HasMany<typeof PreviousRole>

  @hasMany(() => Document)
  public documents: HasMany<typeof Document>

  @hasMany(() => ProgramCertificate)
  public programCertificates: HasMany<typeof ProgramCertificate>

  @column()
  public rememberMeToken: string | null

  @column()
  public inviteCode: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public deletedAt: DateTime

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>

  @manyToMany(() => Task, {
    pivotTable: 'task_mentors',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'task_id',
    localKey: 'id',
    relatedKey: 'id',
  })
  public tasks: ManyToMany<typeof Task>

  @computed()
  public get isAdmin() {
    return this.roleId === Roles.ADMIN
  }

  @computed()
  public get isMentor() {
    return this.roleId === Roles.MENTOR
  }

  @computed()
  public get isMentorManager() {
    return this.roleId === Roles.MENTOR_MANAGER
  }

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
