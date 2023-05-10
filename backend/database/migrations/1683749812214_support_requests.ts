import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'support_requests'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('image_url').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('image_url')
    })
  }
}
