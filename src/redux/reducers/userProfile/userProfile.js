import actionTypes from "../../actions/types";

const {
  LOADPROFILE,
  SETPROFILEDATA,
  SAVEEDITEDPROFILEDATA,
  SETOWNERSTATUS,
  REMOVEPROFILELOADING
} = actionTypes;

const initialState = {
  isLoading: true,
  data: null,
  isOwner: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SETPROFILEDATA:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isOwner: false
      };
    case LOADPROFILE:
      return { ...state, data: null, isLoading: true };
    case SAVEEDITEDPROFILEDATA:
      return {
        ...state,
        data: { ...state.data, ...action.payload }
      };
    case SETOWNERSTATUS:
      return { ...state, isOwner: action.payload };
    case REMOVEPROFILELOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
