import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';
import languageReducer from './languageReducer';

export const rootReducer = combineReducers({
    request: requestReducer,
    language: languageReducer,
})

export type RootState = ReturnType<typeof rootReducer>;
