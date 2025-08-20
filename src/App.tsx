

import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import { CartPage } from './pages/CartPage'
import { QuotePage } from './pages/QuotePage'
import './App.css'
// import './transitions.css' // Ya no es necesario con Framer Motion

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'relative', width: '100%' }} // Asegura que las rutas se posicionen correctamente
          >
            <Routes location={location}>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/cotizador" element={<QuotePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
