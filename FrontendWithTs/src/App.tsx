import React, { useState } from 'react'
import Navbar from './components/navbar/Navbar'
import Login from './components/login/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Footer from './components/footer/Footer'
import Cart from './pages/cart/Cart'
import PlaceOrder from './pages/placeorder/PlaceOrder'
import '@ant-design/v5-patch-for-react-19';
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myorder/MyOrder'


// Add type annotation for props (if any, but here it seems empty)

const App: React.FC = () => {
  
  const [showLogin, setShowLogin] = useState<boolean>(false)

  return (
    <>
    {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
 