import GridActionTypes from './types';

const gridStateReducer = (gridState, action) => {
  switch (action.type) {
    case GridActionTypes.MENTOR_GRID_STATE:
      return {
        ...gridState,
        ...action.payload
      };
      case GridActionTypes.MENTOR_DATA_STATE:
      return {
        ...gridState,
        mentors: action.payload
      };
    default:
      return gridState;
  }
};

export default gridStateReducer;
