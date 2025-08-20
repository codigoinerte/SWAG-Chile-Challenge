
import { Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import './Header.css'

const Header = () => {
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="header">
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
          <nav className="nav">
            <Link to="/" className="nav-link l1">
              <span className="material-icons">home</span>
              Catálogo
            </Link>
            <Link to="/cart" className="nav-link l1">
              <span className="material-icons">shopping_cart</span>
              Carrito
              ({totalItems > 0 && totalItems})
            </Link>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <Link to="/cart" className="cart-mobile">
              <span className="material-icons">shopping_cart</span>             
              ({totalItems > 0 && totalItems})
            </Link>
            <button className="btn btn-secondary cta1">
              <span className="material-icons">person</span>
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
