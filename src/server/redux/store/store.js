import { createStore } from "redux";
import initialState from '../reducer/matchReducer/'

export const store = createStore(initialState)