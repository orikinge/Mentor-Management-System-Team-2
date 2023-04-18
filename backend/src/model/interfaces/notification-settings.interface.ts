export interface GeneralNotifications {
  all: boolean
  programs: boolean
  tasks: boolean
  approvalRequests: boolean
  reports: boolean
}

export interface DiscussionNotifications {
  commentOnMyPost: boolean
  posts: boolean
  comments: boolean
  mentions: boolean
  directMessage: boolean
}

export interface UpdateNotificationSettingsInput {
  user_id: number
  generalNotifications: GeneralNotifications
  discussionNotifications: DiscussionNotifications
}
