import React, { useState } from 'react'
import { savedLoggedInUser, storeToken, userLogin } from '../service/AuthService'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {

    const [usernameOrEmail, setUsernameOrEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate()


    function loginToApp(e){
        e.preventDefault()

        const loginObj = {usernameOrEmail, password}

        console.log(loginObj)

        userLogin(loginObj).then((response) => {
            console.log(response)

            // const token = 'Basic ' + window.btoa(usernameOrEmail + ':' + password);
            const token = 'Bearer ' + response.data.accessToken;

            const role = response.data.role;

            storeToken(token)

            savedLoggedInUser(usernameOrEmail, role)

            navigator('/todos')
            
            window.location.reload(false)
        }).catch((error) => console.log(error))
    }

  return (
    <div className='container'>
    <br></br>
    <div className='row'> 
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            <h2 className='text-center'>Login Form</h2>
            <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                    <label className="form-label">Username:</label>
                    <input
                        type='text'
                        placeholder='Enter Username or Email'
                        name='usernameOrEmail'
                        value={usernameOrEmail}
                        className='form-control'
                        onChange={(e) => setUsernameOrEmail(e.target.value)}></input>
                    </div>

                    <div className='form-group mb-2'>
                    <label className="form-label">Password:</label>
                    <input
                        type='password'
                        placeholder='Enter Password'
                        name='password'
                        value={password}
                        className='form-control'
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </div>

                    <button className= 'btn btn-primary mb-2' onClick={loginToApp}>Login</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default LoginComponent