import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducer/auth.js'

export const store = configureStore({
    reducer: {
        authState: authReducer,
    },
})