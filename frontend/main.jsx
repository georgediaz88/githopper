require('./styles/main.scss')

import { useRouterHistory, Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createHistory } from 'history'

import routes from './router/'
import { repos } from './reducers/Repos'
import { orgs, toggledOrg } from './reducers/Orgs'
import { notifications } from './reducers/Notifications'
import { status } from './reducers/Status'
import { userEvents } from './reducers/UserEvents'
import { authActions, authReducer } from './auth/'
import firebase, { githubProvider } from './firebase/'

export const store = createStore(
  combineReducers({
    auth: authReducer,
    repos,
    orgs,
    toggledOrg,
    notifications,
    status,
    userEvents,
    routing: routerReducer
  }), {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore(browserHistory, store)

// Special function to handle scrolling to top on route change
function handleUpdate(){
  let {
    action
  } = this.state.location
  if(action === 'PUSH'){
    window.scrollTo(0, 0)
  }
}

store.dispatch(authActions.firebaseStart())

ReactDOM.render((
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router onUpdate={handleUpdate} history={history}>
      {routes}
    </Router>
  </Provider>
), document.getElementById('root'))
