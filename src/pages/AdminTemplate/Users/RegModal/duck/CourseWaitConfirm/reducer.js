import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const courseWaitConfirmReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.COURSES_WAIT_CONFIRM_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actionTypes.COURSES_WAIT_CONFIRM_SUCCESS:
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };

    case actionTypes.COURSES_WAIT_CONFIRM_FAIL:
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };

    default:
      return state;
  }
};

export default courseWaitConfirmReducer;
