import {combineReducers, configureStore} from "@reduxjs/toolkit";
import walletReducer from './reducers/WalletSIice'

const rootReducer = combineReducers({
    walletReducer
})

export const store = configureStore({
        reducer: rootReducer
    })


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
