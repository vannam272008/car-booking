import requestReducer from "../Reducers/requestReducer";
import { configureStore, createStore } from "@reduxjs/toolkit";


// export const store = configureStore({
//     reduder: {
//         request: requestReducer
//     }
// });

export const store = createStore(requestReducer);
