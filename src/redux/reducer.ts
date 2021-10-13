import { Action } from 'redux'
import { LOG_IN, LOG_OUT } from './actions'

export interface User {
  id: number
  email: string
  password: string
  numberPerPage: number
}
export interface RootState {
  user: null | User
  errorLogIn: boolean
}

export interface RootAction extends Action {
  payload: any
}

const initialValues: RootState = {
  user: null,
  errorLogIn: false
}

export const reudcer = (state = initialValues, action: RootAction) => {
  switch (action.type) {
    case LOG_IN:
      return state
    case LOG_OUT:
      return state
    default:
      return state
  }
}
