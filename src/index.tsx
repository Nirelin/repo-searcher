import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer'
import { watcher } from './store/sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer, 
  compose(applyMiddleware(sagaMiddleware), 
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&(window as any).__REDUX_DEVTOOLS_EXTENSION__()))

sagaMiddleware.run(watcher);

ReactDOM.render(
  <Provider store = {store}><App /></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
