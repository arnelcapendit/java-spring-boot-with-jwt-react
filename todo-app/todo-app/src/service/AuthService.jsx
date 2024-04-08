import axios from "axios";

// Add a request interceptor

const BASE_URI = 'http://localhost:8086/api/auth'

export const registerForm = (registerObj) => axios.post(BASE_URI + '/register', registerObj)

export const userLogin = (loginObj) => axios.post(BASE_URI + '/login', loginObj)

export const storeToken = (token) => localStorage.setItem("token", token)

export const getToken = () => localStorage.getItem("token")

export const savedLoggedInUser = (username, role) => {
  sessionStorage.setItem("authenticatedUser", username) 
  sessionStorage.setItem("role", role)
}

export const getLoggedInUser = () => sessionStorage.getItem("authenticatedUser")

export const isUserLoggedin = () => {
  return getLoggedInUser() == null ? false : true;
}

export const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
}

export const isAdminUser = () => {
  let role = sessionStorage.getItem("role");

  if(role != null && role === "ROLE_ADMIN"){
    return true;
  }else {
    return false;
  }
}