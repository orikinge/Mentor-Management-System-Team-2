import SearchActionTypes from './types';

const taskSearchReducer = (taskSearch, action) => {
  switch (action.type) {
    case SearchActionTypes.TASK_SEARCH:
      return {
        ...taskSearch,
        ...action.payload
      };
    default:
      return taskSearch;
  }
};

export default taskSearchReducer;
