import { DataTypes } from 'sequelize'
import { BaseModel } from './base/base.model'
import {
  DiscussionNotifications,
  GeneralNotifications,
} from './interfaces/notification-settings.interface'
import { sequelize } from '../config/db.config'

export class NotificationSettings extends BaseModel {
  declare user_id: number

  declare generalNotifications: GeneralNotifications

  declare discussionNotifications: DiscussionNotifications
}

NotificationSettings.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    generalNotifications: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    discussionNotifications: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { tableName: 'notification_settings', sequelize }
)
