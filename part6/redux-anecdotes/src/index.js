import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import {composeWithDevTools} from 'redux-devtools-extension';


import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const reducer = combineReducers({
  anecdotes:anecdoteReducer,
  selected:notificationReducer
});// those are the keys for store object.

const store = createStore(reducer, composeWithDevTools());
console.log(store.getState())


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)