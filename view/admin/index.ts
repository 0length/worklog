import React from 'react'
import { hydrate } from 'react-dom'
import Admin from './Admin'
import Reducer from '../../reducer'
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable';
import {rootEpic} from '../../lib/epic'
// import thunkMiddleware from "redux-thunk";
declare const window: any;
const epicMiddleware = createEpicMiddleware();
const middleware = applyMiddleware(createLogger(), epicMiddleware);
const preloadState: any = window.__PRELOADED_STATE__;
const store = createStore(Reducer, preloadState, composeWithDevTools(middleware))
epicMiddleware.run(rootEpic);
let willberemoved = document.getElementById("willberemoved");
willberemoved && willberemoved.parentNode && willberemoved.parentNode.removeChild(willberemoved);
hydrate(React.createElement(Admin, {store}, null), document.getElementById('root'));

