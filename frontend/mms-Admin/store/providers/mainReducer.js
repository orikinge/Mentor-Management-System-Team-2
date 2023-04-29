import userReducer from './reducers/user';
import searchReducer from './reducers/search';

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  search: searchReducer(state.search, action),
});

export default mainReducer;
