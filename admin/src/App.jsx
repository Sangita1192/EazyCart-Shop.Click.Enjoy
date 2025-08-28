import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Home from './Pages/Home'
import Login from './Pages/Login'
import ProductList from './Pages/ProductList'
import SignUp from './Pages/SignUp'
import ProductCreate from './Pages/ProductCreate'
import ProductSize from './Pages/ProductSize'
import ProductColors from './Pages/ProductColors'
import CategoryCreate from './Pages/CategoryCreate'
import CategoryList from './Pages/CategoryList'
import OrderList from './Pages/Order'
import ProductEdit from './Pages/ProductEdit'
import ProductDetail from './Pages/ProductDetail'
import BannerCreate from './Pages/BannerCreate'
import BannerList from './Pages/BannerList'
import BannerEdit from './Pages/BannerEdit'
import PageNotFound from './Pages/PageNotFound'
import Users from './Pages/Users'
import Profile from './Pages/Profile'
import CategoryEdit from './Pages/CategoryEdit'



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "products/list", element: <ProductList /> },
        { path: "products/add", element: <ProductCreate /> },
        { path: "products/edit/:id", element: <ProductEdit /> },
        { path: "products/detail/:id", element: <ProductDetail /> },
        { path: "products/size", element: <ProductSize /> },
        { path: "products/color", element: <ProductColors /> },
        { path: "category/add", element: <CategoryCreate /> },
        { path: "category/list", element: <CategoryList /> },
        { path: "category/edit/:id", element: <CategoryEdit /> },
        { path: "orders", element: <OrderList /> },
        { path: "banners/add", element: <BannerCreate /> },
        { path: "banners/edit/:id", element: <BannerEdit /> },
        { path: "banners/view", element: <BannerList /> },
        { path: "users", element: <Users /> },
        { path: "profile", element: <Profile /> },
      ]
    },
    { path: "login", element: <Login /> },
    { path: "register", element: <SignUp /> },
    { path: "*", element: <PageNotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App
