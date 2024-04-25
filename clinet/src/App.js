import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { UserContextProvider } from './contexts/UserContext';
import Home from './templates/Home'
import Login from './templates/Login'
import Signup from './templates/SignUp'
import Cart from './templates/Cart'
import Dashboard from './templates/Dashboard'
import AdminLogin from './templates/AdminLogin';
import { AdminContextProvider } from './contexts/AdminContext';
import { ProductContextProvider } from './contexts/ProductContext';
import UpdateProduct from './templates/UpdateProduct';
import Search from './templates/Search';
import Product from './templates/Product';
import Success from './templates/Success';

function App() {
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <AdminContextProvider>
            <ProductContextProvider>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/search/:query' element={<Search />} />
                <Route path='/product/:id' element={<Product />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/admin' element={<Dashboard />} />
                <Route path='/admin/updateproduct/:id' element={<UpdateProduct />} />
                <Route path='/admin-login' element={<AdminLogin />} />
                <Route path='/checkout' element={<Success />} />
              </Routes>
            </ProductContextProvider>
          </AdminContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
