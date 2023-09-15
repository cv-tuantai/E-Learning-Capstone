import { combineReducers } from "redux";
import listCoursesReducer from "../pages/HomeTemplate/Home/Courses/duck/reducer";
import courseCategoryReducer from "../components/Header/duck/reducer";
import coursesByCateReducer from "../pages/HomeTemplate/CourseCate/duck/reducer";
import detailCourseReducer from "../pages/HomeTemplate/DetailCourse/duck/GetDetail/reducer";
import registerCourseReducer from "../pages/HomeTemplate/DetailCourse/duck/RegisterCourse/reducer";
import loginReducer from "../pages/UserTemplate/Login/duck/reducer";
import registerReducer from "../pages/UserTemplate/Register/duck/reducer";
import userReducer from "../pages/UserTemplate/Profile/duck/UserDetail/reducer";
import updateUserReducer from "../pages/UserTemplate/Profile/duck/UpdateUser/reducer";
import cancelCourseReducer from "../pages/UserTemplate/Profile/duck/CancelCourse/reducer";
import listUserReducer from "../pages/AdminTemplate/Users/duck/ListUsers/reducer";
import addUserReducer from "../pages/AdminTemplate/Users/duck/AddUser/reducer";
import deleteUserReducer from "../pages/AdminTemplate/Users/duck/DeleteUser/reducer";

const rootReducer = combineReducers({
  listCoursesReducer,
  courseCategoryReducer,
  coursesByCateReducer,
  detailCourseReducer,
  loginReducer,
  registerReducer,
  userReducer,
  updateUserReducer,
  registerCourseReducer,
  cancelCourseReducer,
  listUserReducer,
  addUserReducer,
  deleteUserReducer,
});

export default rootReducer;
