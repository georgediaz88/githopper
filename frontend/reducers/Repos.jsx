export const repos = (state = [], action)=> {
  switch (action.type) {

  case 'LOAD_REPOS':
    return action.repos

  case 'ENABLE_ALL_EMAIL_PREFERENCES':
    return state.map((repo)=>{
      repo.subscribed = true
      return repo
    })

  case 'DISABLE_ALL_EMAIL_PREFERENCES':
    return state.map((repo)=>{
      repo.subscribed = false
      return repo
    })

  case 'TOGGLE_EMAIL_PREFERENCE':
    return state.map((repo)=>{
      if (repo.id == action.id) {
        return Object.assign({}, repo, {
          subscribed: !repo.subscribed
        })
      }
      return repo
    })

  default:
    return state;
  }
}
