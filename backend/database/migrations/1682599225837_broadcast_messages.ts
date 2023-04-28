import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'broadcast_messages'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.specificType('files', 'varchar[]')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('files')
    })
  }
}
