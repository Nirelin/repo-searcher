import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxSaga from 'redux-saga';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';
import { watcher } from './store/sagas';

const sagaMiddleware = reduxSaga();

const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watcher);

ReactDOM.render(
  <Provider store = {store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
