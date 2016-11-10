export const userEvents = (state = {}, action)=> {
  switch (action.type) {

  case 'LOAD_USER_EVENTS':
    return action.payload

  default:
    return state
  }
}
