import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from 'redux-logger';
import { tasksReducer } from "./tasksReducer";
import { authReducer } from "./authReducer";

const rootReducer = combineReducers({
    tasksReducer: tasksReducer,
    authReducer: authReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));