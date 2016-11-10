import axios from 'axios'

import firebase, {githubProvider} from '../firebase/'
import { history } from '../main.jsx'
import {
  INIT_AUTH,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './action-types'

const ROOT_URL = (process.env.NODE_ENV !== 'production') ? (window.location.protocol + "//" + window.location.hostname  + ":3050/api/v1") : 'http://api.githopper.com/api/v1'
const accessTokenKey = 'githopper.accessToken'

function authenticate(provider) {
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(provider).then((result)=> {
      localStorage.setItem(accessTokenKey, result.credential.accessToken)

      firebase.auth().currentUser.getToken(true).then((idToken)=>{
        axios.defaults.headers.common['X-Firebase-Token'] = idToken
        axios.post(`${ROOT_URL}/github_users`, {
          email: result.user.providerData[0].email,
          name: result.user.providerData[0].displayName,
          uid: result.user.uid,
          access_token: result.credential.accessToken
        }).then(()=>{
          dispatch(login({uid: result.user.uid, photoURL: result.user.photoURL}))
          history.replace('/')
        })
      })
    })
  }
}

export function login(payload) {
  return (dispatch, getState) => {
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: payload,
      meta: {
        timestamp: Date.now()
      }
    })
  }
}

export function signInWithGithub() {
  githubProvider.addScope('repo')
  githubProvider.addScope('user:email')
  return authenticate(githubProvider)
}

export function signOut() {
  return (dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({
        type: SIGN_OUT_SUCCESS
      })
      localStorage.removeItem(accessTokenKey)
      history.replace({pathname: '/login'})
    })
  }
}
