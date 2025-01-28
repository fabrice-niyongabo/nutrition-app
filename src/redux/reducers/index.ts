import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
const rootReducer = combineReducers({
  notificationsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
