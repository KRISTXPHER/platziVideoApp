function videos(state = {}, action) {
  switch (action.type) {
    case 'SET_SUGGESTIONS_LIST': {
      return {...state, ...action.payload}
    }
    case 'SET_CATEGORIES_LIST': {
      return {...state, ...action.payload}
    }
    default:
      return state
  }
}

export default videos;