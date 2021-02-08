export const logoutAction = () => {
  return {
    type: "LOGOUT"
  }
}
export const fetchTodayAnimalsAction = (data) => {
  return {
    type: 'FETCH_TODAY',
    today: data
  }
}

export const fetchAnimalsAction = data => {
  return {
    type: 'FETCH_ANIMALS',
    payload: data
  }
}