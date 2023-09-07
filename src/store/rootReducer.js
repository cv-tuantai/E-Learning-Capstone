import { combineReducers } from "redux";
import listCoursesReducer from "../pages/HomeTemplate/Home/Courses/duck/reducer";
import courseCategoryReducer from "../components/Header/duck/reducer";
import coursesByCateReducer from "../pages/HomeTemplate/CourseCate/duck/reducer";
import detailCourseReducer from "../pages/HomeTemplate/DetailCourse/duck/reducer";

const rootReducer = combineReducers({
  //child reducer
  listCoursesReducer,
  courseCategoryReducer,
  coursesByCateReducer,
  detailCourseReducer,
});

export default rootReducer;
