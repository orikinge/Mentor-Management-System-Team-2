import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'program_certificates'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
    table.integer('creator_id').unsigned().references('id').inTable('users').onDelete('CASCADE').notNullable();
    table.boolean('is_approved').notNullable().defaultTo(false);
  })
}

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('creator_id');
      table.dropColumn('is_approved');
    })
  }
}
