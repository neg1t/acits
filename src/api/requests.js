const options = (token) => {
  return {
    method: 'GET', 
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
      'current-shelter': 1
    }
  }
}
export const checkResponse = (res) => {
  if (!res.ok) {
    throw new Error('token dead')
  } 
}
export const logout = (dispathcLogout, history) => {
  dispathcLogout()
  localStorage.removeItem('token')
  history.push('/login')
}
export const getCurrentAnimal = async (id, token) => {
  const response = await fetch(`https://acits-api.herokuapp.com/api/v1/animals/${id}/`, options(token))
  return response
}
export const getTodayAnimals = async (token) => {
  const response = await fetch('https://acits-api.herokuapp.com/api/v1/prescriptions/today/', options(token))
  return response
}
export const getAllAnimals = async (token) => {
  const response = await fetch('https://acits-api.herokuapp.com/api/v1/animals/', options(token))
  return response
}