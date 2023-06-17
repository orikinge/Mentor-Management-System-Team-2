import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'form_fields'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table
        .integer('form_template_id')
        .unsigned()
        .references('id')
        .inTable('form_templates')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table.string('label').notNullable()
      table.string('type').notNullable() // eg: checkbox, text, textarea, radio, etc...
      table.specificType('options', 'varchar[]').nullable()
      table.string('validation_rules').nullable()
      table.boolean('is_required').notNullable().defaultTo(true)
      table.integer('order').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
