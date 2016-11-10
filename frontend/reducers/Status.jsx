const initialState = {
  loading: false
}

export const status = (state = initialState, action)=> {
  switch (action.type) {

  case 'REQUEST_LOADING':
    return {
      loading: true
    }

  case 'REQUEST_DONE':
    return {
      loading: false
    }

  default:
    return state
  }

}
