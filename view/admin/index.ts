import React from 'react'
import { hydrate } from 'react-dom'
import Admin from './Admin'
import Reducer from '../../reducer'
import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import { createLogger } from 'redux-logger'
import { createEpicMiddleware } from 'redux-observable'
import {rootEpic} from '../../lib/epic'

declare const window: any
const epicMiddleware = createEpicMiddleware()
const middleware = applyMiddleware(createLogger(), epicMiddleware)
const preloadState: any = window.__PRELOADED_STATE__
const store = createStore(Reducer, preloadState, composeWithDevTools(middleware))
epicMiddleware.run(rootEpic)
const willberemoved: HTMLElement|null = document.getElementById("willberemoved")
willberemoved && willberemoved.parentNode ? willberemoved.parentNode.removeChild(willberemoved):window.location.href = '/admin'
hydrate(React.createElement(Admin, {store}, null), document.getElementById('root'))

