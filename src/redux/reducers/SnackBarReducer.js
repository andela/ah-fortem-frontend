import uuid from "uuidv4";
import types from "../actions/types";
const { DISPLAYMESSAGE, DISMISSMESSAGE } = types;

const MessageReducer = (state = [], action) => {
  switch (action.type) {
    case DISPLAYMESSAGE:
      return [
        ...state,
        {
          message: action.payload.message,
          id: uuid(),
          type: action.payload.type
        }
      ];
    case DISMISSMESSAGE:
      return state.filter(toast => toast.id !== action.payload);
    default:
      return state;
  }
};
export default MessageReducer;
