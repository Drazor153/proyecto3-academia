import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import { studentsApi } from './services/studentsApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { levelsApi } from './services/levelsApi'
import { teacherApi } from './services/teacherApi'
import { classesApi } from './services/classesApi'
import { userApi } from './services/userApi'

export const store = configureStore({
    reducer: {
        userReducer,
        [studentsApi.reducerPath]: studentsApi.reducer,
        [levelsApi.reducerPath]: levelsApi.reducer,
        [teacherApi.reducerPath]: teacherApi.reducer,
        [classesApi.reducerPath]: classesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            studentsApi.middleware,
            levelsApi.middleware,
            teacherApi.middleware,
            classesApi.middleware,
            userApi.middleware,
        ])
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch