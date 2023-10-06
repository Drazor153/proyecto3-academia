export enum QuizActionsEnum{
  DELETE = 'delete',
  INSERT = 'insert'
}

export type QuizData = {
  run: number,
  grade: number
}
export type QuizActionType = QuizData & {type: QuizActionsEnum}

type QuizState = {
  quizzesEdited: QuizData[]
}
export const quizReducer = (state: QuizState, action: QuizActionType) => {
  const quizExists = state.quizzesEdited.findIndex((quiz: QuizData) => quiz.run === action.run);
  if(quizExists >= 0){
    state.quizzesEdited.splice(quizExists, 1)
  }
  switch (action.type) {
    case QuizActionsEnum.DELETE:
      return state
    case QuizActionsEnum.INSERT:
      return {
        quizzesEdited: [...state.quizzesEdited, {run: action.run, grade: action.grade}]
      }
    default:
      return state
  }
  

}