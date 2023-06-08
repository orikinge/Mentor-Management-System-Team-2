import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'programs'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('start_date').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
      table.timestamp('end_date').notNullable().defaultTo(this.raw('CURRENT_TIMESTAMP'))
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('start_date')
      table.dropColumn('end_date')
    })
  }
}
