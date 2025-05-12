import { createBrowserRouter } from 'react-router-dom'
import App from './src/App'
import Home from './src/Pages/Home'
import Login from './src/Pages/Login'
import Register from './src/Pages/Register'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login/> },
      {path:'register', element: <Register/>},
      // { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
