import NotificationTypes from './types';

const notifiactionReducer = (notification, action) => {
  switch (action.type) {
    case NotificationTypes.NOTIFICATION_ALERT:
      return {
        ...notification,
        ...action.payload
      };
    default:
      return notification;
  }
};

export default notifiactionReducer;
