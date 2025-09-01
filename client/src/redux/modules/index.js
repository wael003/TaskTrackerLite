
import { combineReducers } from "redux";
import report from './report';
import task from "./task";
import timeEntry from './timeEntry';
import users from './users';

export default combineReducers({report , task , timeEntry, users})