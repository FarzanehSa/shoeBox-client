import React, { useState, useEffect } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

import GeneralContext from './contexts/GeneralContext';

import Homepage from './components/Homepage';
import NavList from './components/NavList';
import Collection from './components/Collection';
import NotExistPage from './components/NotExistPage';
import SingleProduct from './components/SingleProductPage/SingleProduct';
import Footer from './components/Footer/Footer';
import AboutUs from './components/Footer/AboutUs';
import Warranty from './components/Footer/Warranty';
import Shipping from './components/Footer/Shipping';
import Returns from './components/Footer/Returns';

import NavbarAdminPortal from './components/Admin/NavbarAdminPortal';
import Dashboard from './components/Admin/Dashboard';
import AdminProduct from './components/Admin/AdminProduct';
import AdminInventory from './components/Admin/AdminInventory';
import AdminOrders from './components/Admin/AdminOrders';
import AdminReviews from './components/Admin/AdminReviews';
import LoginModal from "./components/Admin/LoginModal";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const [productSpec, setProductSpec] = useState({
    categories: [],
    styles: [],
    sizes: [],
    colors: []
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [url, setUrl] = useState('')


  // use this to change the navbar
  const matchDashboard = useMatch('/dashboard/*');
  
  useEffect(() => {
    // at first mount - get local storage cart info
    const cart = JSON.parse(localStorage.getItem('cart-info'));
    if (cart) {
      setCart(cart);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {setUser(user);}

    if (process.env.REACT_APP_API_BASE_URL) {
      setUrl("https://shoe-box-api.herokuapp.com");
    } else {
      setUrl("http://localhost:8100");
    }

    const f1 = axios.get(`${url}/api/products`);
    const f2 = axios.get(`${url}/api/specification`)

    Promise.all([f1, f2])
      .then(([r1, r2]) => {
        // handle success
        const categories = r2.data.categories;
        const styles = r2.data.styles;
        const colors = r2.data.colors;
        const sizes = r2.data.sizes;
        setProducts(prev => r1.data.products);
        setProductSpec({categories,styles, colors, sizes});
      });

  }, [url]);

  // set local storage when cart state changed!
  useEffect(() => {
    localStorage.setItem('cart-info', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));

    // in /dashboard url, pop up modal, if there is no admin user
    if (matchDashboard && !user.name) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false)
    }
  }, [user, matchDashboard]);

  const addProduct = (newProduct, newSizes) => {
    axios.post(`${url}/api/products`, {product: newProduct, sizeData: newSizes})
    .then(res => {
      console.log(res.data);
      if(res.data.errCode === 1001) {
        toast(`${res.data.errMsg}`, {type: 'error'})
      } else {
        const newAddedProduct = res.data;
        setProducts([...products, newAddedProduct ])
        toast(`Product with SKU:${newAddedProduct.sku} has been added!`, {type: 'success'})
      }
    })
    .catch(error => {
      toast(`${error.message}`, {type: 'error'});
    })
  }

  const editProduct = (updateProduct, newSizes) => {
    axios.put(`${url}/api/products/${updateProduct.id}`, {product: updateProduct, sizeData: newSizes })
    .then(res => {
      if(res.data.errCode === 1002) {
        toast(`${res.data.errMsg}`, {type: 'error'})
      } else {
        const updatedProduct = res.data;
        const updatedProducts = products.map(product => {
          if (product.id === updatedProduct.id) {
            return updatedProduct
          } 
          return product
        })
        setProducts([...updatedProducts ])
        toast(`Product with SKU:${updatedProduct.sku} has been edited!`, {type: 'success'})
      }
    })
    .catch(error => {
      toast(`${error.message}`, {type: 'error'});
    })
  }

  // function openModal() {setModalIsOpen(true);}

  function closeModal() {setModalIsOpen(false);}

  function onLogin(inputUser) {
    if (inputUser.name === 'admin' && inputUser.password === '123') {
      setUser(inputUser);
      setLoginError("")
      closeModal();
    } else {
      setLoginError("Login info is not correct!")
    }
  }

  // console.log('👟👞🥾', products);    // 🚨🚨🚨
  // console.log('🔧🪛',productSpec)   // 🚨🚨🚨
  // console.log('🧺',cart) // 🚨🚨🚨
  // console.log('👤',user) // 🚨🚨🚨

  return (
    <div>
      <GeneralContext.Provider value={{ products, productSpec, user, setUser, setCart, cart, url }}>
        {matchDashboard && !user.name && <NavbarAdminPortal zIndex={0} />}
        {matchDashboard && user.name && <NavbarAdminPortal user={user} zIndex={1100} />}
        {!matchDashboard && <NavList/>}
        { modalIsOpen && 
          <Modal isOpen={modalIsOpen} 
            className="modal" 
            appElement={document.getElementById('root')}
          > 
            {matchDashboard && !user.name &&
            <LoginModal onLogin={onLogin} msg={loginError}/>}
          </Modal>
        }
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/collection/:id" element={<Collection />} />
          <Route path="/*" element={<NotExistPage />} />
          <Route path="/collection/men/:id" element={<SingleProduct />} />
          <Route path="/collection/women/:id" element={<SingleProduct />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/warranty" element={<Warranty />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>} />
          <Route path="/dashboard/product" element={<AdminProduct onEdit={editProduct} onAdd={addProduct}/>} />
          <Route path="/dashboard/inventory" element={<AdminInventory />} />
          <Route path="/dashboard/orders" element={<AdminOrders />} />
          <Route path="/dashboard/reviews" element={<AdminReviews />} />
        </Routes>
        <Footer />
      </GeneralContext.Provider>
    </div>
  );
}

export default App;