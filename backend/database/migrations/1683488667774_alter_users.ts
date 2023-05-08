import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('availability_program').nullable()
      table.string('program_of_interest').nullable()
      table.string('been_a_mentor').nullable()
      table.string('year_of_experience').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('availability_program')
      table.dropColumn('program_of_interest')
      table.dropColumn('been_a_mentor')
      table.dropColumn('year_of_experience')
    })
  }
}
