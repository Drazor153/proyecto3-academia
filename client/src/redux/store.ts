import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import classesReducer from './features/classesSlice'
import { studentsApi } from './services/studentsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { levelsApi } from './services/levelsApi'

export const store = configureStore({
    reducer: {
        userReducer,
        classesReducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
        [levelsApi.reducerPath]: levelsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            studentsApi.middleware,
            levelsApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch