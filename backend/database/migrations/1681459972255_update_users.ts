import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('bio').nullable()
      table.string('profile_image_path').nullable()
      table.json('social_media_links').nullable()
      table.timestamp('deleted_at').nullable()
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('bio')
      table.dropColumn('profile_image_path')
      table.dropColumn('social_media_links')
      table.dropColumn('deleted_at')
    })
  }
}
