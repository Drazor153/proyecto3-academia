import { createSlice } from "@reduxjs/toolkit";
import { ClassesStudent, ClassesTeacher } from "../../utils/types";

type initialStateType = {}[] | ClassesStudent[] | ClassesTeacher[];

const initialState: initialStateType = [];

export const classesSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setClasses: (prevState, action) => {
            prevState.splice(0, prevState.length);
            prevState.push(...action.payload);
        },
        updateClasses: (prevState, action) => {
            prevState[action.payload.index] = action.payload.class;
        },
        pushClasses: (prevState, action) => {
            prevState.push(action.payload);
        },
        deleteClasses: (prevState, action) => {
            prevState.splice(action.payload, 1);
        }
    }
});

export default classesSlice.reducer;
export const { setClasses, updateClasses, pushClasses, deleteClasses } = classesSlice.actions;