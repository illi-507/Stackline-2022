import {combineReducers} from "redux";
import { dataFetchReducer } from "./dataFetchReducer";

export const rootReducer = combineReducers({
    data: dataFetchReducer
})