import requestReducer from "../Reducers/requestReducer";
import { createStore } from "@reduxjs/toolkit";


export const store = createStore(requestReducer);
