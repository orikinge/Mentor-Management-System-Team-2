import userReducer from './reducers/user';

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
});

export default mainReducer;
