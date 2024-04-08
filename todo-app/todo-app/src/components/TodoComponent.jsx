import React, { useEffect, useState } from 'react'
import { createTodo, getTodoById, updateTodo } from '../service/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

function TodoComponent() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)

    const navigator = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if(id){
            getTodoById(id).then((response) => {
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }).catch((error) => {
                console.log(error)
            })
        }
    }, [])


    function pageTitle() {
        if(id) {
            return <h2 className='text-center'>Update Todos</h2>
        }else{
            return <h2 className='text-center'>Add Todos</h2>
        }
        
    }

    function saveTodo(e) {
        e.preventDefault()

        const todo = {title, description, completed}

        if(id) {
            updateTodo(id, todo).then((response) => {
                console.log(response)
                navigator('/todos')
            }).catch((error) => {
                console.log(error)
            })
        }else {
            createTodo(todo).then((response) => {
                console.log(response.data)
                navigator('/todos')
            }).catch((error) => {
                console.log(error)
            })
        }
    }

  return (
<div className='container'>
    <br></br>
    <div className='row'> 
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
                pageTitle()
            }
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                    <label className="form-label">Title</label>
                    <input
                        type='text'
                        placeholder='Enter Title'
                        name='title'
                        value={title}
                        className='form-control'
                        onChange={(e) => setTitle(e.target.value)}></input>
                    </div>

                    <div className='form-group mb-2'>
                    <label className="form-label">Description</label>
                    <input
                        type='text'
                        placeholder='Enter Description'
                        name='description'
                        value={description}
                        className='form-control'
                        onChange={(e) => setDescription(e.target.value)}></input>
                    </div>

                    <div className='form-group mb-2'>
                    <label className="form-label">Completed</label>
                    <select
                        className='form-control'
                        name='completed'
                        value={completed}
                        onChange={(e) => setCompleted(e.target.value)}>
                            <option value='false'>No</option>
                            <option value='true'>Yes</option>
                        </select>       
                    </div>

                    <button className= 'btn btn-primary mb-2' onClick={(e) => saveTodo(e)}>Submit</button>
                
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default TodoComponent