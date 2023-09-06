import { combineReducers } from "redux";
import listCoursesReducer from "../pages/HomeTemplate/Home/Courses/duck/reducer";

const rootReducer = combineReducers({
  //child reducer
  listCoursesReducer,
});

export default rootReducer;
