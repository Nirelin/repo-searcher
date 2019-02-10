import { takeEvery } from 'redux-saga/effects';
import { searchSaga } from './searchSaga';

export function* watcher() {
  yield takeEvery(['INITIALIZATION', 'CHANGE_FILTER', 'NEXT_PAGE'] , searchSaga);
}
