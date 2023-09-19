import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const delCourseByAdminReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.DEL_COURSE_BY_ADMIN_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actionTypes.DEL_COURSE_BY_ADMIN_SUCCESS:
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };

    case actionTypes.DEL_COURSE_BY_ADMIN_FAIL:
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };

    default:
      return state;
  }
};

export default delCourseByAdminReducer;
