import { createBrowserRouter } from 'react-router-dom'
import App from './src/App'
import Home from './src/Pages/Home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
    //   { path: 'about', element: <About /> },
    //   { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
