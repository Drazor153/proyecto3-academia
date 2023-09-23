import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { studentsApi } from './services/studentsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
    reducer: {
        userReducer,
        [studentsApi.reducerPath]: studentsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([studentsApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch