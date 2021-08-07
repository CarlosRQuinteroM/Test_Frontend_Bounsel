import { STARTIME, ENDTIME } from "../type";

const initialState = {
  startTime: "",
};

const TIMEReducer = (state = initialState, action) => {
  switch (action.type) {
    case STARTIME:
      return action.payload;

    case ENDTIME:
      return initialState;

    default:
      return state;
  }
};

export default TIMEReducer;
