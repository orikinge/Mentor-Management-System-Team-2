import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'program_certificates'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('date_of_issue').notNullable()
      table.string('certificate_id').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table)=>{
      table.dropColumn('date_of_issue')
      table.dropColumn('certificate_id')
    })
  }
}
