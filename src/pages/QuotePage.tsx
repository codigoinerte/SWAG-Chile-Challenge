

import { useQuoteStore } from '../store/quoteStore';
import { Link } from 'react-router-dom';
import { FormatPrice } from '../helpers/FormatPrice';
import { getPricingInfoForQuantity } from '../store/cartStore';
import { QuotePrintable } from '../components/QuotePrintable';
import './CartPage.css'; // Reutilizamos los estilos del carrito para consistencia
import './QuotePage.css'; // Estilos adicionales para el cotizador

export const QuotePage = () => {
  const { items, companyInfo, removeItem, updateItemQuantity, updateCompanyInfo, getQuoteTotal, getTotalItems } = useQuoteStore();

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCompanyInfo(name as keyof typeof companyInfo, value);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title no-print">Cotizador de Productos</h1>
      
      {/* Formulario de Datos de la Empresa */}
      <div className="quote-company-form no-print">
        <h2 className="cart-summary-title">Datos de la Empresa</h2>
        <div className="form-grid">
          <input type="text" name="name" placeholder="Nombre o Razón Social" value={companyInfo.name} onChange={handleInfoChange} className="quote-input" />
          <input type="text" name="rut" placeholder="RUT (ej: 76.123.456-7)" value={companyInfo.rut} onChange={handleInfoChange} className="quote-input" />
          <input type="text" name="address" placeholder="Dirección" value={companyInfo.address} onChange={handleInfoChange} className="quote-input" />
          <input type="email" name="email" placeholder="Email de Contacto" value={companyInfo.email} onChange={handleInfoChange} className="quote-input" />
          <input type="tel" name="phone" placeholder="Teléfono de Contacto" value={companyInfo.phone} onChange={handleInfoChange} className="quote-input" />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart no-print">
          <h2>Tu cotización está vacía</h2>
          <p>Añade productos desde el catálogo para crear una cotización.</p>
          <Link to="/"><button className="btn-cart">Ir al Catálogo</button></Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="items-container no-print">
            {items.map(item => {
              const { unitPrice, discount } = getPricingInfoForQuantity(item);
              const savings = (item.basePrice - unitPrice) * item.quantity;
              return (
                <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item">
                  <div className="image-placeholder thumbnail cart-item-image">
                    <span className="material-icons">image</span>
                  </div>
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-options">
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p>Talla: {item.selectedSize}</p>}
                    </div>
                    <div className="cart-item-pricing">
                      <span>Precio Unitario: {FormatPrice(unitPrice)}</span>
                      {discount && <span className="discount-badge">{discount}% OFF</span>}
                    </div>
                    {savings > 0 && (
                      <div className="savings-amount"><span>Ahorro: {FormatPrice(savings)}</span></div>
                    )}
                    <div className="cart-item-quantity">
                      <span>Cantidad:</span>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value), item.selectedColor, item.selectedSize)} className="quantity-input p1" />
                    </div>
                    <button onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize)} className="btn-cart btn-cart-danger">Eliminar</button>
                  </div>
                  <div className="cart-item-price">{FormatPrice(unitPrice * item.quantity)}</div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary no-print">
            <h2 className="cart-summary-title">Resumen de Cotización</h2>
            <div className="cart-summary-row">
              <span>Subtotal ({getTotalItems()} productos):</span>
              <span>{FormatPrice(getQuoteTotal())}</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total:</span>
              <span>{FormatPrice(getQuoteTotal())}</span>
            </div>
            <button className="btn-checkout" style={{backgroundColor: '#007bff'}} onClick={handlePrint}>
              <span className="material-icons" style={{marginRight: '8px'}}>picture_as_pdf</span>
              Exportar a PDF
            </button>
          </div>
        </div>
      )}
      {/* Componente para la impresión, visible solo en @media print */}
      <div className="print-only">
        <QuotePrintable />
      </div>
    </div>
  );
};

