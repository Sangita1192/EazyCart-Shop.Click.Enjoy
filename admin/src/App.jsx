import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Login from './Pages/Login'



function App() {
  const router = createBrowserRouter([
    
    {
      path: "/",
      element: <Home/>,
      children:[
        {
          index: true,  //this makes Dashboard the default child route
          element: <Dashboard/>
        },
        
      ]
    },
    {
      path:"/login",
      element: <Login/>
    },
  ])
  return (
    <RouterProvider router={router}/>

  )
}

export default App
