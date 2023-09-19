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
import addCourseReducer from "../pages/AdminTemplate/Courses/duck/AddCourse/reducer";
import deleteCourseReducer from "../pages/AdminTemplate/Courses/duck/DeleteCourse/reducer";
import updateCourseReducer from "../pages/AdminTemplate/Courses/duck/UpdateCourse/reducer";
import courseWaitConfirmReducer from "../pages/AdminTemplate/Users/RegModal/duck/CourseWaitConfirm/reducer";
import courseUnRegReducer from "../pages/AdminTemplate/Users/RegModal/duck/CoursesUnReg/reducer";
import courseConfirmReducer from "../pages/AdminTemplate/Users/RegModal/duck/CourseConfirmed/reducer";
import regCourseByAdminReducer from "../pages/AdminTemplate/Users/RegModal/duck/regCourseByAdmin/reducer";
import delCourseByAdminReducer from "../pages/AdminTemplate/Users/RegModal/duck/delCourseByAdmin/reducer";
import usersUnregReducer from "../pages/AdminTemplate/Courses/RegModalCourse/duck/UsersUnreg/reducer";
import usersWaitConfirmReducer from "../pages/AdminTemplate/Courses/RegModalCourse/duck/UsersWaitConfirm/reducer";
import usersConfirmReducer from "../pages/AdminTemplate/Courses/RegModalCourse/duck/UsersConfirmed/reducer";

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
  addCourseReducer,
  deleteCourseReducer,
  updateCourseReducer,
  courseUnRegReducer,
  courseWaitConfirmReducer,
  courseConfirmReducer,
  regCourseByAdminReducer,
  delCourseByAdminReducer,
  usersUnregReducer,
  usersWaitConfirmReducer,
  usersConfirmReducer,
});

export default rootReducer;
