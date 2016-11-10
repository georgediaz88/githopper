export const orgs = (state = [], action)=> {
  switch (action.type) {

  case 'LOAD_ORGS':
    return action.orgs

  default:
    return state;
  }
}

export const toggledOrg = (state = {}, action)=> {
  switch (action.type) {

  case 'TOGGLE_ORG':
    return { login: action.login }

  default:
    return state;
  }

}
