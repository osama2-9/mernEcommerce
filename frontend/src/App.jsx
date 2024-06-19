import './App.css'
import { Routes, Route, useLocation, useNavigate, BrowserRouter } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Product from './components/Product'
import Cart from './pages/Cart'
import { ToastContainer } from 'react-toastify'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import DashBored from './pages/DashBored'
import Admin from './pages/admin/Admin'
import CreateProduct from './pages/admin/CreateProduct'
import CreateCategory from './pages/admin/CreateCategory'
import ShowProduct from './pages/admin/ShowProduct'
import Sidebar from './components/Sidebar'
import ShowCategory from './pages/admin/ShowCategory'
import Customer from './pages/admin/Customer'
import Profile from './pages/admin/Profile'
import Address from './pages/Address'
import Orders from './pages/admin/Orders'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import SpecificProducts from './pages/SpecificProducts'
import Sales from './pages/admin/Sales'

function App() {
  const user = useRecoilValue(userAtom)
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname.includes('/admin') && !user?.isAdmin) {
    navigate('/')
  }

  return (
    <div>
      <Header />
      {location.pathname.includes('/admin') && user?.isAdmin && <Sidebar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:uid/:token' element={<ResetPassword />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/product/:pid' element={<Product />} />
        <Route path='/cart/:uid' element={user && <Cart />} />
        <Route path='/dashbored/:uid' element={user && <DashBored />} />
        <Route path='/admin/:uid' element={user?.isAdmin && <Admin />} />
        <Route path='/admin/product/create' element={user?.isAdmin && <CreateProduct />} />
        <Route path='/admin/product/show' element={user?.isAdmin && <ShowProduct />} />
        <Route path='/admin/category/create' element={user?.isAdmin && <CreateCategory />} />
        <Route path='/admin/category/show' element={user?.isAdmin && <ShowCategory />} />
        <Route path="/products/:categoryName/:categoryId" element={<SpecificProducts />} />
        <Route path='/admin/customer' element={user?.isAdmin && <Customer />} />
        <Route path='/admin/sales' element={user?.isAdmin && <Sales />} />
        <Route path='/admin/profile/:uid' element={user?.isAdmin && <Profile />} />
        <Route path='/admin/order/' element={user?.isAdmin && <Orders />} />
        <Route path='/address' element={user && <Address />} />
      </Routes>
      <ToastContainer position='bottom-center' />
    </div>
  )
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
