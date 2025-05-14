import { createBrowserRouter } from 'react-router-dom'
import App from './src/App'
import Home from './src/Pages/Home'
import Login from './src/Pages/Login'
import Register from './src/Pages/Register'
import ProductListing from './src/Pages/ProductListing'
import ProductDetail from './src/Pages/ProductDetail'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login/> },
      {path:'register', element: <Register/>},
      {path:'products', element: <ProductListing/>},
      {path:'product/:id', element: <ProductDetail/>},
      // { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
