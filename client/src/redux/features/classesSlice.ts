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
            // return action.payload;
        }
    }
});

classesSlice.actions.setClasses([]);
// console.log(classesSlice.)

export default classesSlice.reducer;
export const { setClasses } = classesSlice.actions;