import * as firebase from 'firebase'

// initialize firebase client with API keys
// [note] you still have to authenticate via Github on app-side
firebase.initializeApp({
  apiKey: 'AIzaSyD2o6RfJfGehuiQpwrimQQK3jDtGuFU4Lw',
  authDomain: 'project-5391227025497230644.firebaseapp.com',
  databaseURL: 'https://project-5391227025497230644.firebaseio.com',
  storageBucket: 'project-5391227025497230644.appspot.com'
})

export const githubProvider = new firebase.auth.GithubAuthProvider()
export default firebase
