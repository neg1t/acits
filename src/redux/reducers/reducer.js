const checkToken = () => {
  if (localStorage.token && localStorage.token !== '') {
    return true
  } else {
    return false
  }
}

const initialState = {
  isAuth: checkToken(),
  todayAnimals: [],
  animals: [],
  toast: false
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'AUTH': {
      return {
        ...state,
        isAuth: true
      }
    }
    case 'FETCH_TODAY' : {
      return {
        ...state,
        todayAnimals: [...state.todayAnimals, ...action.today]
      }
    }
    case 'FETCH_ANIMALS': {
      return {
        ...state,
        animals: [...state.animals, ...action.payload]
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuth: false,
        toast: true
      }
    }
    default: 
      return state;
  }
}

export default reducer;