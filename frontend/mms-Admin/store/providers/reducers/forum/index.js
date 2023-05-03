import DiscussionActionTypes from "./types";

const DiscussionReducer = (posts, action) => {
  switch (action.type) {
    case DiscussionActionTypes.UPDATE_DISCUSSION:
      return [...action.payload];

    default:
      return posts;
  }
};

export default DiscussionReducer;
