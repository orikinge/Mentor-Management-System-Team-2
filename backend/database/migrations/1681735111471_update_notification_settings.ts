import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notification_settings'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .json('settings')
        .notNullable()
        .defaultTo(
          JSON.stringify({
            general: {
              email: true,
              push: true,
              notifications: {
                all: { email: true, push: true },
                programs: { email: true, push: true },
                tasks: { email: true, push: true },
                approval_requests: { email: true, push: true },
                reports: { email: true, push: true },
              },
            },
            discussion: {
              email: true,
              push: true,
              notifications: {
                comments_on_post: { email: true, push: true },
                posts: { email: true, push: true },
                comments: { email: true, push: true },
                mentions: { email: true, push: true },
                direct_message: { email: true, push: true },
              },
            },
          })
        )
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('settings')
    })
  }
}
