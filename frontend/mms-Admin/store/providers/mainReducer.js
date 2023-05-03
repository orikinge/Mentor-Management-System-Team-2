import userReducer from "./reducers/user";
import searchReducer from "./reducers/search";
import DiscussionReducer from "./reducers/forum";

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  search: searchReducer(state.search, action),
  forum: DiscussionReducer(state.forum, action),
});

export default mainReducer;
