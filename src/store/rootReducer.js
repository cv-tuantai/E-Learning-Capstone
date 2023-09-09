import { combineReducers } from "redux";
import listCoursesReducer from "../pages/HomeTemplate/Home/Courses/duck/reducer";
import courseCategoryReducer from "../components/Header/duck/reducer";
import coursesByCateReducer from "../pages/HomeTemplate/CourseCate/duck/reducer";
import detailCourseReducer from "../pages/HomeTemplate/DetailCourse/duck/reducer";
import loginReducer from "../pages/UserTemplate/Login/duck/reducer";
import registerReducer from "../pages/UserTemplate/Register/duck/reducer";

const rootReducer = combineReducers({
  listCoursesReducer,
  courseCategoryReducer,
  coursesByCateReducer,
  detailCourseReducer,
  loginReducer,
  registerReducer,
});

export default rootReducer;
