import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    rut: '',
    name: 'User',
    role: 'SUPERUSER'
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        swaptype: (state) => {
            state.role = (state.role == 'SUPERUSER' ? 'STUDENT' : 'SUPERUSER')
        }
    }
})

export default userSlice.reducer
export const { swaptype } = userSlice.actions