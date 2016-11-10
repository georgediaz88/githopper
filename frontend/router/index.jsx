import React, { PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import firebase from '../firebase/'
import axios from 'axios'

import { store } from '../main.jsx'
import { authActions } from '../auth/'

// Components
import App from '../containers/App'
import Home from '../components/Home'
import Settings from '../components/Settings'
import Login from '../components/Login'

const loginWithToken = (token, replace, next, redirectPath=null)=>{
  let credential = firebase.auth.GithubAuthProvider.credential(token)
  firebase.auth().signInWithCredential(credential).then((user)=>{

    firebase.auth().currentUser.getToken(true).then((idToken)=>{
      axios.defaults.headers.common['X-Firebase-Token'] = idToken
      store.dispatch(authActions.login({uid: user.uid, photoURL: user.photoURL}))
      if(redirectPath){ replace({pathname: redirectPath}) }
      next()
    })
  }).catch((error)=>{
    console.log("error", error)
    store.dispatch(authActions.signOut())
  })
}

const redirectIfLoggedIn = (nextState, replace, next) => {
  const user = firebase.auth().currentUser
  const token = localStorage.getItem('githopper.accessToken')

  if(user) {
    replace({pathname: '/'})
  }
  else {
    token ? loginWithToken(token, replace, next, '/') : next()
  }
}

const requireLogin = (nextState, replace, next) => {
  const user = firebase.auth().currentUser
  const token = localStorage.getItem('githopper.accessToken')

  if(!user){
    if (token) {
      loginWithToken(token, replace, next)
    }
    else {
      store.dispatch(authActions.signOut())
    }
  }
  else {
    next()
  }
}

export default (
  <Route component={App} path="/">
    <IndexRoute component={Home} onEnter={requireLogin}/>
    <Route component={Login} path='/login' onEnter={redirectIfLoggedIn}/>
    <Route component={Settings} path='/settings' onEnter={requireLogin}/>
  </Route>
)
