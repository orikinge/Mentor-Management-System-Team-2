import UserTypes from './types';

const userReducer = (user, action) => {
  switch (action.type) {
    case UserTypes.UPDATE_USER:
      return {
        ...user,
        ...action.payload
      };
    case UserTypes.UPDATE_PRIVACY_SETTINGS:
      return {
        ...user,
        settings: action.payload
      };
    default:
      return user;
  }
};

export default userReducer;
