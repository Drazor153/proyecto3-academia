import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import classesReducer from './features/classesSlice'
import { studentsApi } from './services/studentsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { levelsApi } from './services/levelsApi'
import { teacherApi } from './services/teacherApi'

export const store = configureStore({
    reducer: {
        userReducer,
        classesReducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
        [levelsApi.reducerPath]: levelsApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            studentsApi.middleware,
            levelsApi.middleware,
            teacherApi.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch