import userReducer from "./reducers/user";
import searchReducer from "./reducers/search";
import DiscussionReducer from "./reducers/forum";
import gridStateReducer from "./reducers/mentor";
import taskSearchReducer from "./reducers/task/index";
import notificationReducer from "./reducers/notification";

const mainReducer = (state, action) => ({
  user: userReducer(state.user, action),
  search: searchReducer(state.search, action),
  forum: DiscussionReducer(state.forum, action),
  gridState: gridStateReducer(state.gridState, action),
  taskSearch: taskSearchReducer(state.taskSearch, action),
  notification: notificationReducer(state.notification, action),
});

export default mainReducer;
