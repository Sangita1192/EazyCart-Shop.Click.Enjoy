import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from './src/App'
import Home from './src/Pages/Home'
import Login from './src/Pages/Login'
import Register from './src/Pages/Register'
import ProductListing from './src/Pages/ProductListing'
import ProductDetail from './src/Pages/ProductDetail'
import CartPage from './src/Pages/CartPage'
import Account from './src/Pages/Account'
import Profile from './src/Components/Account/Profile'
import Address from './src/Components/Account/Address'
import Wishlist from './src/Components/Account/Wishlist'
import Order from './src/Components/Account/Order'
import CheckOut from './src/Pages/CheckOut';
import VerifyUserAccount from './src/Pages/VerfiyUserAccount';
import PublicRoute from './src/Components/Routes/PublicRoute';
import PrivateRoute from './src/Components/Routes/PrivateRoute';
import ResetPassword from './src/Components/ResetPassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <PublicRoute />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'register', element: <Register /> },
          { path: 'reset-password', element: <ResetPassword /> },
        ],
      },
      { path: 'verify-email', element: <VerifyUserAccount /> },
      { path: 'products', element: <ProductListing /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <CartPage /> },
      { 
        element: <PrivateRoute />,
        children: [
          { path: 'checkout', element: <CheckOut /> },
          {
            path: 'my-account',
            element: <Account />,
            children: [
              { index: true, element: <Profile /> },
              { path: 'address', element: <Address /> },
              { path: 'wishlist', element: <Wishlist /> },
              { path: 'orders', element: <Order /> },
            ],
          },
        ],
      },
      // { path: '*', element: <NotFound /> },
    ],
  },
])

export default router
