import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const cancelCourseReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.CANCEL_COURSE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actionTypes.CANCEL_COURSE_SUCCESS:
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };

    case actionTypes.CANCEL_COURSE_FAIL:
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default cancelCourseReducer;
