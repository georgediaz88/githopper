import axios from 'axios'
import { groupBy } from 'lodash'
import moment from 'moment'

const ROOT_URL = (process.env.NODE_ENV !== 'production') ? (window.location.protocol + "//" + window.location.hostname  + ":3050/api/v1") : 'http://api.githopper.com/api/v1'

export function handleSnackbarRequestClose(){
  return dispatch => {
    dispatch({type: 'HIDE_SNACKBAR_MESSAGE'})
  }
}

export function fetchRepos(){
  return dispatch => {
    dispatch({type: 'REQUEST_LOADING'})
    axios.get(`${ROOT_URL}/repos`).then((res)=>{
      dispatch({type: 'REQUEST_DONE'})
      dispatch({type: 'LOAD_REPOS', repos: res.data })
    })
  }
}

export function fetchOrganizations(){
  return dispatch => {
    axios.get(`${ROOT_URL}/organizations`).then((res)=>{
      let login = res.data.filter((org)=>org.type == 'User')[0].login
      dispatch({type: 'TOGGLE_ORG', login: login })
      dispatch({type: 'LOAD_ORGS', orgs: res.data })
    })
  }
}

export function fetchUserEvents(){
  return dispatch => {
    dispatch({type: 'REQUEST_LOADING'})
    axios.get(`${ROOT_URL}/user_events`).then((res)=>{
      dispatch({type: 'REQUEST_DONE'})

      let userEvents = groupBy(res.data, (userEvent)=>{
        var currentDate = moment().startOf('day')
        return currentDate.diff(moment(Date.parse(userEvent.created_at)).local().startOf('day'), 'days')
      })

      dispatch({type: 'LOAD_USER_EVENTS', payload: userEvents })
    })
  }
}

export function onRepoPreferenceToggled(repo){
  return dispatch => {
    let follow_or_unfollow = repo.subscribed ? 'unfollow' : 'follow'
    axios.post(`${ROOT_URL}/github_users/${follow_or_unfollow}`, { repos: [repo.reference_name] }).then((res)=>{
      dispatch({type: 'SHOW_SNACKBAR_MESSAGE', snackbarMessage: 'Subscription Changed' })
    })
    dispatch({type: 'TOGGLE_EMAIL_PREFERENCE', id: repo.id})
  }
}

export function toggleOrg(org){
  return dispatch => {
    dispatch({type: 'TOGGLE_ORG', login: org.login })
    dispatch({type: 'REQUEST_LOADING'})
    axios.get(`${ROOT_URL}/repos`, { params: org }).then((res)=>{
      dispatch({type: 'REQUEST_DONE'})
      dispatch({type: 'LOAD_REPOS', repos: res.data })
    })
  }
}

export function enableAll(repos){
  return dispatch => {
    axios.post(`${ROOT_URL}/github_users/follow`, { repos: repos, mass_update: true }).then((res)=>{
      dispatch({type: 'SHOW_SNACKBAR_MESSAGE', snackbarMessage: 'Subscribed to all' })
    })
    dispatch({type: 'ENABLE_ALL_EMAIL_PREFERENCES' })
  }
}

export function disableAll(repos){
  return dispatch => {
    axios.post(`${ROOT_URL}/github_users/unfollow`, { repos: repos }).then((res)=>{
      dispatch({type: 'SHOW_SNACKBAR_MESSAGE', snackbarMessage: 'Unsubscribed to all' })
    })
    dispatch({type: 'DISABLE_ALL_EMAIL_PREFERENCES' })
  }
}
