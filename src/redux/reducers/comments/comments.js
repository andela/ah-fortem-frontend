import actionTypes from "../../actions/types";

const {
  SET_COMMENTS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  SET_LOADING_COMMENTS,
  EDIT_COMMENT,
  REMOVE_LOADING_COMMENTS,
  UPDATE_COMMENT_LIKES
} = actionTypes;
/**
 * The initial State of the comments reducer
 */
const initialState = {
  comments: [],
  isLoading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return { ...state, comments: action.payload };
    case CREATE_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };
    case SET_LOADING_COMMENTS:
      return { ...state, isLoading: true };
    case REMOVE_LOADING_COMMENTS:
      return { ...state, isLoading: false };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== action.payload
        )
      };
    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map(comment => {
          return comment.id === action.payload.id
            ? { ...comment, body: action.payload.body }
            : comment;
        })
      };

    case UPDATE_COMMENT_LIKES:
      const likesData = action.payload.data;
      const type = action.payload.type;
      return {
        ...state,
        comments: state.comments.map(comment => {
          const { id, likesCount } = comment;
          if (id === action.payload.id) {
            if (type) {
              const proptype = type === "commentLike" ? "likes" : "dislikes";
              const newValue =
                type === "commentLike" ? likesCount.likes : likesCount.dislikes;
              return {
                ...comment,
                likesCount: { ...likesCount, [proptype]: newValue - 1 }
              };
            }
            return { ...comment, likesCount: likesData.data };
          } else {
            return comment;
          }
        })
      };
    default:
      return state;
  }
};
