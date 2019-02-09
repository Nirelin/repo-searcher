import { Reducer, AnyAction } from 'redux'
import * as actionTypes from './actions/actionTypes'
import { Moment } from 'moment';

export interface IRootState {
  readonly filters: {
    readonly repoName: string
    readonly owner: string
    readonly language: string
    readonly type: string
    readonly stars: string
    readonly updatedAfter: Moment|''
    readonly hasTopics: boolean
    readonly sortOrder: string
    readonly page: number
  },
  readonly data: {
    readonly totalCount: number|null,
    readonly items: IItem[]|null
  },
  readonly refreshLoading: boolean,
  readonly addRepsLoading: boolean,
  readonly error: any
}

export interface IItem {
  name: string,
  owner: string,
  ownerAvatar: string,
  description: string,
  htmlUrl: string,
  language: string,
  stars: string,
  forks: string
}


const initialState : IRootState = {
  filters: {
    repoName: '',
    owner: '',
    language: 'All',
    type: 'All',
    stars: '',
    updatedAfter: '',
    hasTopics: false,
    sortOrder: 'Best match',
    page: 1
  },
  data: {
    totalCount: null,
    items: null
  },
  refreshLoading: false,
  addRepsLoading: false,
  error: null
}

const reducer : Reducer<IRootState, AnyAction> = (state = initialState, action) : IRootState => {
  switch(action.type){
    case actionTypes.INITIALIZATION: return {...state, refreshLoading: true};
    case actionTypes.CHANGE_FILTER: return changeFilter(state, action);
    case actionTypes.NEXT_PAGE: return nextPage(state);
    case actionTypes.UPDATE_REPS: return {...state, data: action.updatedRepList, refreshLoading: false, error: null};
    case actionTypes.ADD_REPS: return addReps(state, action);
    case actionTypes.ERROR: return error(state, action);
    default: return state;
  }
};

const changeFilter  = (state: IRootState, action: AnyAction) : IRootState  => {
  return {
    ...state,
    refreshLoading: true,
    filters: {
      ...state.filters,
      page: 1,
      [action.filterName]: action.filterValue
    }
  }
}

const nextPage = (state: IRootState) : IRootState  => {
  return {
    ...state,
    addRepsLoading: true,
    filters: {
      ...state.filters, 
      page: state.filters.page +1
    }
  }
}

const addReps  = (state: IRootState, action: AnyAction) : IRootState  => {
  return {
    ...state,
    addRepsLoading: false,
    data: {
      ...state.data,
      items: state.data.items!.concat(action.newReps.items)
    }
  }
}
const error = (state: IRootState, action: AnyAction) : IRootState  => {
  return {
    ...state, 
    data: {
      totalCount: null,
      items: null
    }, 
    refreshLoading: false, 
    addRepsLoading: false,
    error: action.error}
}
export default reducer;