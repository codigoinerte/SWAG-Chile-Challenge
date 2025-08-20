
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import './Header.css'


const Header = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header no-print">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span className="material-icons">store</span>
            </div>
            <span className="logo-text p1-medium">SWAG Challenge</span>
          </Link>

          {/* Navigation */}
          <nav className="nav nav-desktop">
            <Link to="/" className="nav-link l1">
              <span className="material-icons">home</span>
              Catálogo
            </Link>
            <Link to="/cart" className="nav-link l1">
              <span className="material-icons">shopping_cart</span>
              Carrito (<span className="cart-counter">{totalItems ?? 0}</span>)
            </Link>
          </nav>

          {/* Hamburguesa Mobile siempre presente, animación solo con CSS */}
          <div className={`mobile-overlay${menuOpen ? ' show' : ''}`} onClick={() => setMenuOpen(false)} />
          <div className={`mobile-menu${menuOpen ? ' slide-in' : ''}`}>
            <Link to="/" className="mobile-link" onClick={()=>setMenuOpen(false)}>
              <span className="material-icons">home</span> Inicio
            </Link>
            <Link to="/" className="mobile-link" onClick={()=>setMenuOpen(false)}>
              <span className="material-icons">category</span> Productos
            </Link>
            <Link to="/cotizador" className="mobile-link" onClick={()=>setMenuOpen(false)}>
              <span className="material-icons">calculate</span> Cotización
            </Link>
            <Link to="/cart" className="mobile-link" onClick={()=>setMenuOpen(false)}>
              <span className="material-icons">shopping_cart</span> Carrito
              {totalItems > 0 && <span className="cart-counter">{totalItems}</span>}
            </Link>
          </div>

          {/* Actions */}
          <div className="header-actions">
            <button className="btn btn-secondary cta1">
              <span className="material-icons">person</span>
              Iniciar Sesión
            </button>
          </div>

          <button className="hamburger-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>
            <span className="material-icons">menu</span>
          </button>

        </div>
      </div>
    </header>
  )
}


export default Header
