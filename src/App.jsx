import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header';
import Home from './pages/Home';
import ItemDetail from './pages/ItemDetail';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import About from './pages/About';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;