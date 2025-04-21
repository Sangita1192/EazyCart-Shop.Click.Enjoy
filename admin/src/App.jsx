import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import SignUp from './Pages/SignUp'
import ProductCreate from './Pages/ProductCreate'



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
        {
          path:"/products/list", 
          element: <ProductList/>
        },
        {
          path:"/products/add", 
          element: <ProductCreate/>
        },
        
      ]
    },
    {
      path:"/login",
      element: <Login/>
    },
    {
      path:"/register",
      element: <SignUp/>
    },
  ])
  return (
    <RouterProvider router={router}/>

  )
}

export default App
