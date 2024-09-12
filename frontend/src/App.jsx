import './App.css';
import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, BrowserRouter, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Product from './components/Product';
import Cart from './pages/Cart';
import { ToastContainer } from 'react-toastify';
import { useRecoilValue } from 'recoil';
import userAtom from './atoms/userAtom';
import DashBored from './pages/DashBored';
import Admin from './pages/admin/Admin';
import CreateProduct from './pages/admin/CreateProduct';
import CreateCategory from './pages/admin/CreateCategory';
import ShowProduct from './pages/admin/ShowProduct';
import Sidebar from './components/Sidebar';
import ShowCategory from './pages/admin/ShowCategory';
import Customer from './pages/admin/Customer';
import Profile from './pages/admin/Profile';
import Address from './pages/Address';
import Orders from './pages/admin/Orders';
import ForgetPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import SpecificProducts from './pages/SpecificProducts';
import Sales from './pages/admin/Sales';
import UserProfile from './pages/UserProfile';
import MyOrders from './pages/MyOrders';
import CreateBrand from './pages/admin/CreateBrand';
import AdminHeader from './components/AdminHeader';
import ShowBrands from './pages/admin/ShowBrands';
import BrandWithProducts from './pages/BrandWithProducts';
import Favorite from './pages/Favorite';
import VerifyEmail from './components/VerifiyEmail';
import TimedSaleProducts from './pages/admin/TimedSaleProducts';

function App() {
  const user = useRecoilValue(userAtom);
  const location = useLocation();
  const navigate = useNavigate();
  
  

  useEffect(() => {
    if (location.pathname.includes('/admin') && !user?.isAdmin) {
      navigate('/');
    }
  }, [location, user, navigate]);
  const showHeader = !['/login', '/register', '/forget-password', '/reset-password', '/my-orders', '/user-profile', '/dashboard', '/address', '/favorite', '/verify-email'].some(path => location.pathname.includes(path));


  return (
    <div>
      {location.pathname.includes('/admin') ? <AdminHeader /> : showHeader && <Header />}

      {location.pathname.includes('/admin') && user?.isAdmin && <Sidebar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forget-password' element={<ForgetPassword />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/verify-email/:token' element={<VerifyEmail />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/product/:pid' element={<Product />} />
        <Route path='/cart/:uid' element={user ? <Cart /> : <HomePage />} />
        <Route path='/dashboard/:uid' element={user ? <DashBored /> : <HomePage />} />
        <Route path='/admin/:uid' element={user?.isAdmin ? <Admin /> : <Navigate to='/'  />} />
        <Route path='/admin/product/create' element={user?.isAdmin ? <CreateProduct /> : <HomePage />} />
        <Route path='/admin/product/show' element={user?.isAdmin ? <ShowProduct /> : <HomePage />} />
        <Route path='/admin/product/timedSale' element={user?.isAdmin ? <TimedSaleProducts /> : <HomePage />} />
        <Route path='/admin/category/create' element={user?.isAdmin ? <CreateCategory /> : <HomePage />} />
        <Route path='/admin/category/show' element={user?.isAdmin ? <ShowCategory /> : <HomePage />} />
        <Route path='/admin/brand/create' element={user?.isAdmin ? <CreateBrand /> : <HomePage />} />
        <Route path='/admin/brand/show' element={user?.isAdmin ? <ShowBrands /> : <HomePage />} />
        <Route path='/brand/:bid' element={<BrandWithProducts />} />
        <Route path='/products/:categoryName/:categoryId' element={<SpecificProducts />} />
        <Route path='/admin/customer' element={user?.isAdmin ? <Customer /> : <HomePage />} />
        <Route path='/admin/sales' element={user?.isAdmin ? <Sales /> : <HomePage />} />
        <Route path='/admin/profile/:uid' element={user?.isAdmin ? <Profile /> : <HomePage />} />
        <Route path='/admin/order' element={user?.isAdmin ? <Orders /> : <HomePage />} />
        <Route path='/address' element={user ? <Address /> : <HomePage />} />
        <Route path='/user-profile' element={user ? <UserProfile /> : <HomePage />} />
        <Route path='/my-orders/:uid' element={user ? <MyOrders /> : <HomePage />} />
        <Route path='/favorite/:uid' element={user ? <Favorite /> : <HomePage />} />
      </Routes>

      <ToastContainer position='bottom-center' />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
