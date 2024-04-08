import axios from "axios"
import { getToken } from "./AuthService";

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers['Authorization'] = getToken();

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export const BASE_URI = 'http://localhost:8086/api/todos'

export const getTodoList = () => axios.get(BASE_URI)

export const getTodoById = (id) => axios.get(BASE_URI + '/' + id)

export const createTodo = (todo) => axios.post(BASE_URI, todo)

export const updateTodo = (id, todo) => axios.put(BASE_URI + '/' + id, todo)

export const removeTodo = (id) => axios.delete(BASE_URI + '/' + id)

export const completeTodo = (id) =>  axios.patch(BASE_URI + '/' + id + '/complete')

export const incompleteTodo = (id) =>  axios.patch(BASE_URI + '/' + id + '/incomplete')