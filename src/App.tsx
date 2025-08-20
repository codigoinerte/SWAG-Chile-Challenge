import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import { CartPage } from './pages/CartPage' // Importar la página del carrito
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} /> {/* Añadir la nueva ruta */}
        </Routes>
      </main>
    </div>
  )
}

export default App