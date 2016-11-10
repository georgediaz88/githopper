const initialState = {
  snackbarMessage: '',
  openSnackbar: false
}

export const notifications = (state = initialState, action)=> {
  switch (action.type) {

  case 'SHOW_SNACKBAR_MESSAGE':
    return {
      ...state,
      openSnackbar: true,
      snackbarMessage: action.snackbarMessage
    }

  case 'HIDE_SNACKBAR_MESSAGE':
    return {
      ...state,
      openSnackbar: false,
      snackbarMessage: ''
    }

  default:
    return state;
  }

}
