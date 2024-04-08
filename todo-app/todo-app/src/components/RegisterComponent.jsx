import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerForm } from '../service/AuthService'

function RegisterComponent() {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const navigator = useNavigate()

    function handleRegistration(e) {
        e.preventDefault()

        const register = {name, username, password, email}

        registerForm(register).then((response) => {
            console.log(response)
            navigator('/login')
        }).catch((error) => console.log(error))
    }

  return (
    <div className='container'>
            <br></br>
            <div className='row'> 
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>Registration Form</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                            <label className="form-label">Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Name'
                                name='name'
                                value={name}
                                className='form-control'
                                onChange={(e) => setName(e.target.value)}></input>
                            </div>

                            <div className='form-group mb-2'>
                            <label className="form-label">Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Email'
                                name='email'
                                value={email}
                                className='form-control'
                                onChange={(e) => setEmail(e.target.value)}></input>
                            </div>

                            <div className='form-group mb-2'>
                            <label className="form-label">Username:</label>
                            <input
                                type='text'
                                placeholder='Enter Username'
                                name='username'
                                value={username}
                                className='form-control'
                                onChange={(e) => setUsername(e.target.value)}></input>
                            </div>

                            <div className='form-group mb-2'>
                            <label className="form-label">Password:</label>
                            <input
                                type='password'
                                name='password'
                                placeholder='Enter Password'
                                value={password}
                                className='form-control'
                                onChange={(e) => setPassword(e.target.value)}></input>
                            </div>

                            <button className= 'btn btn-primary mb-2' onClick={handleRegistration}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default RegisterComponent