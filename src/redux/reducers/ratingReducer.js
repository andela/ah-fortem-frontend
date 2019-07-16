import ratingActions from "../actions/types";

export default (state = 0, action) => {
  switch (action.type) {
    case ratingActions.POST_RATING:
      return action.payload;
    default:
      return state;
  }
};
