import { combineReducers } from "redux";
import listCoursesReducer from "../pages/HomeTemplate/Home/Courses/duck/reducer";
import courseCategoryReducer from "../components/Header/duck/reducer";

const rootReducer = combineReducers({
  //child reducer
  listCoursesReducer,
  courseCategoryReducer,
});

export default rootReducer;
