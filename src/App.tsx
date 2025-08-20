import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import { CartPage } from './pages/CartPage'
import { QuotePage } from './pages/QuotePage' // Importar la página de cotización
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cotizador" element={<QuotePage />} /> {/* Añadir la nueva ruta */}
        </Routes>
      </main>
    </div>
  )
}

export default App