import * as actionTypes from "./constants";

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const coursesByCateReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.GET_COURSES_BY_CATE_REQUEST:
      state.loading = true;
      state.data = null;
      state.error = null;
      return { ...state };

    case actionTypes.GET_COURSES_BY_CATE_SUCCESS:
      state.loading = false;
      state.data = payload;
      state.error = null;
      return { ...state };

    case actionTypes.GET_COURSES_BY_CATE_FAIL:
      state.loading = false;
      state.data = null;
      state.error = payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default coursesByCateReducer;
