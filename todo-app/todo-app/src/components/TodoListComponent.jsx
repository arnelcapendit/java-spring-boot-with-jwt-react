import React, { useEffect, useState } from 'react'
import { completeTodo, getTodoList, incompleteTodo, removeTodo } from '../service/TodoService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../service/AuthService'

function TodoListComponent() {

    const [todos, setTodos] = useState([])

    const navigator = useNavigate()

    const isAdmin = isAdminUser();


    useEffect(() => {
        getAllTodos()
    }, [])

    function getAllTodos(){
        getTodoList().then((response) => {
            setTodos(response.data)
        }).catch((error) => console.log(error))
    }

    function deleteTodo(id){
        removeTodo(id).then((response) => {
            console.log(response)
            getAllTodos()
        }).catch((error) => console.log(error))
        
    }

    function completeTodos(id) {
        completeTodo(id).then((response) => {
            getAllTodos()
        }).catch((error) => console.log(error))
    }

    function incompleteTodos(id) {
        incompleteTodo(id).then((response) => {
            getAllTodos()
        }).catch((error) => console.log(error))
    }

    function addTodos() {
        navigator('/add-todo')
    }

    function updateTodo(id) {
        navigator(`/edit-todo/${id}`)
    }

  return (
    <div className='container'>
        <h1 className='text-center'>Todo List</h1>
        {
            isAdmin && 
            <button className='btn btn-primary mb-2' onClick={addTodos}>Add Todo</button>
        }
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Completed</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    todos.map((todo) => 
                        <tr key={todo.id}>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td>{todo.completed ? 'Yes': 'No'}</td>
                            <td>
                            {
                                isAdmin && 
                                <button className='btn btn-primary' onClick={() => {updateTodo(todo.id)}}>Update</button>
                            }
                            {
                                isAdmin &&
                                <button className='btn btn-danger' onClick={() => {deleteTodo(todo.id)}}>Delete</button>
                            }
                                <button className='btn btn-success' onClick={() => {completeTodos(todo.id)}}>Completed</button>
                                <button className='btn btn-warning' onClick={() => {incompleteTodos(todo.id)}}>In Complete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default TodoListComponent