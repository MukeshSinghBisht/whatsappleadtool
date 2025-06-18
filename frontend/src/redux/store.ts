import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import leadReducer  from "./slices/leadSlice"
const sagaMiddleware = createSagaMiddleware();
import rootSaga from './sagas/leadSaga';

export const store = configureStore({
    reducer: {
        lead: leadReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
    }).concat(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { sagaMiddleware }