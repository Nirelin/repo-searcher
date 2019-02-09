import { put, select } from 'redux-saga/effects';
import { updateReps, addReps, saveError } from '../actions/actions';
import {IRootState} from '../reducer';
import axios from 'axios';
import filtersToUrl from '../../utils/filtersToUrl'
import saveResponse from '../../utils/saveResponse'

export function* searchSaga() {
  const filters = yield select((state: IRootState) => state.filters);
  try{
    const response = yield axios.get(filtersToUrl(filters));
    if (filters.page===1){
      yield put(updateReps(saveResponse(response)));
    } else {
      yield put(addReps(saveResponse(response)));
    }
  } catch(error){
      yield put(saveError(error.response))
  }
}

