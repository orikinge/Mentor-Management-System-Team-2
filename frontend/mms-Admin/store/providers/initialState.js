import user from "./reducers/user/state";
import search from "./reducers/search/state";
import forum from "./reducers/forum/state";
import gridState from "./reducers/mentor/state";
import taskSearch  from "./reducers/task/state";
import notification from "./reducers/notification/state";

const initialState = {
  user,
  search,
  forum,
  gridState,
  taskSearch,
  notification,
};

export default initialState;
