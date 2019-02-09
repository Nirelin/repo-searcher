import * as actionTypes from './actionTypes'
export const initialize = () => {
  return {
    type: actionTypes.INITIALIZATION
  }
}
export const changeFilter = (filterName : string, filterValue: string|boolean) => {
  return {
    filterName,
    filterValue,
    type: actionTypes.CHANGE_FILTER
  }
}

export const nextPage = () => {
  return {
    type: actionTypes.NEXT_PAGE
  }
}

export const updateReps = (updatedRepList) => {
  return {
    updatedRepList,
    type: actionTypes.UPDATE_REPS
  }
}

export const addReps = (newReps) => {
  return {
    newReps,
    type: actionTypes.ADD_REPS
  }
}

export const saveError = (error) => {
  return {
    error,
    type: actionTypes.ERROR
  }
}