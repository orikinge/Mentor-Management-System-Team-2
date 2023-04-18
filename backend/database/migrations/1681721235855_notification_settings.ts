import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notification_settings'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');

      table.json('notification_settings').notNullable().defaultTo(JSON.stringify({
        general: {
          email: true,
          push: true,
          notifications: [
            {name: 'all', email: true, push: true},
            {name: 'programs', email: true, push: true},
            {name: 'tasks', email: true, push: true},
            {name: 'approval_requests', email: true, push: true},
            {name: 'reports', email: true, push: true}
          ]
        },
        discussion: {
          email: true,
          push: true,
          notifications: [
            {name: 'comments_on_post', email: true, push: true},
            {name: 'posts', email: true, push: true},
            {name: 'comments', email: true, push: true},
            {name: 'mentions', email: true, push: true},
            {name: 'direct_message', email: true, push: true}
          ]
        }
      }))
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
