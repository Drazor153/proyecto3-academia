import { Dispatch } from "react"

export type SelectedOption ={
  topic: string,
  year: string,
  level: string,
  semester: string
} 
export enum TypeKind {
  YEAR = 'YEAR',
  TOPIC = 'TOPIC',
  LEVEL = 'LEVEL',
  SEMESTER = 'SEMESTER',

}
export type ActionType = {
  type: TypeKind,
  payload: string
}
export const reducer = (state: SelectedOption, action: ActionType) => {
  const {type, payload} = action;
  switch (type) {
      case TypeKind.TOPIC:
          return {
              ...state,
              topic: payload
          }
      case TypeKind.LEVEL:
          return {
              ...state,
              level: payload,
              year: '',
              semester: ''
          }
      case TypeKind.YEAR:
          return {
              ...state,
              year: payload,
              semester: ''
          }
      case TypeKind.SEMESTER:
          return {
              ...state,
              semester: payload
          }
      default:
          return state
  }
}

export type DispatchProps = {state: SelectedOption ,dispatch: Dispatch<ActionType>}