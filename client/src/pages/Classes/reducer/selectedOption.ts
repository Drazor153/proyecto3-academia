import { Dispatch } from 'react';

export type SelectedOption = {
    year: number;
    semester: number;
    level: string;
    lesson: string;
};

export enum TypeKind {
    YEAR = 'YEAR',
    LESSON = 'LESSON',
    LEVEL = 'LEVEL',
    SEMESTER = 'SEMESTER',
}

export type ActionType = {
    type: TypeKind;
    payload: string;
};

export const reducer = (state: SelectedOption, action: ActionType) => {
    const { type, payload } = action;
    switch (type) {
        case TypeKind.YEAR:
            return {
                year: parseInt(payload),
                semester: 0,
                level: '',
                lesson: '',
            }
        case TypeKind.SEMESTER:
            return {
                ...state,
                semester: parseInt(payload),
                level: '',
                lesson: '',
            }
        case TypeKind.LEVEL:
            return {
                ...state,
                level: payload,
                lesson: '',
            }
        case TypeKind.LESSON:
            return {
                ...state,
                lesson: payload,
            }
        default:
            return state;
    }
};

export type DispatchProps = { state: SelectedOption; dispatch: Dispatch<ActionType> };