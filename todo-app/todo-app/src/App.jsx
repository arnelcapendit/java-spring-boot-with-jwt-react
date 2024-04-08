import { Children, useState } from 'react'
import './App.css'
import TodoListComponent from './components/TodoListComponent'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TodoComponent from './components/TodoComponent'
import RegisterComponent from './components/RegisterComponent'
import HeaderComponent from './components/HeaderComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedin } from './service/AuthService'

function App() {
  const [count, setCount] = useState(0)

  function AuthenticatedRoute({children}) {
    const isAuth = isUserLoggedin();

    if(isAuth){
      return children;
    }

    return <Navigate to="/" />
  }

  return (
    <>
    <BrowserRouter>
     <HeaderComponent />
        <Routes>
          <Route path='/' element={ <LoginComponent /> }></Route>
          
          <Route path='/todos' element={ 
          <AuthenticatedRoute>
            <TodoListComponent /> 
          </AuthenticatedRoute>
          }></Route>

          <Route path='/add-todo' element={ 
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>  
          }></Route>
          
          <Route path='/edit-todo/:id' element={ 
          <AuthenticatedRoute>
            <TodoComponent />
          </AuthenticatedRoute>
           }></Route>

          <Route path='/register' element={ <RegisterComponent /> }></Route>
          <Route path='/login' element={ <LoginComponent /> }></Route>
        </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
