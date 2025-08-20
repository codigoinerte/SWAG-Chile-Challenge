
import React from 'react';
import { useQuoteStore } from '../store/quoteStore';
import { FormatPrice } from '../helpers/FormatPrice';
import { getPricingInfoForQuantity } from '../store/cartStore';
import './QuotePrintable.css';

// Este es el componente que se imprimirá
export const QuotePrintable = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { items, companyInfo, getQuoteTotal } = useQuoteStore();

  return (
    <div ref={ref} className="printable-container">
      <header className="printable-header">
        <div className="logo-placeholder">
            <span className="material-icons">store</span>
            <span className="text p1-medium">SWAG Challenge</span>
        </div>
        <h1>Cotización de Productos</h1>
      </header>

      <section className="company-details">
        <h2>Datos del Cliente</h2>
        <p><strong>Razón Social:</strong> {companyInfo.name || 'N/A'}</p>
        <p><strong>RUT:</strong> {companyInfo.rut || 'N/A'}</p>
        <p><strong>Dirección:</strong> {companyInfo.address || 'N/A'}</p>
        <p><strong>Email:</strong> {companyInfo.email || 'N/A'}</p>
        <p><strong>Teléfono:</strong> {companyInfo.phone || 'N/A'}</p>
      </section>

      <section className="items-table">
        <h2>Detalle de Productos</h2>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Detalles</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => {
              const { unitPrice } = getPricingInfoForQuantity(item);
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    {item.selectedColor && `Color: ${item.selectedColor}`}
                    {item.selectedSize && `, Talla: ${item.selectedSize}`}
                  </td>
                  <td>{item.quantity}</td>
                  <td>{FormatPrice(unitPrice)}</td>
                  <td>{FormatPrice(unitPrice * item.quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <footer className="printable-footer">
        <div className="summary">
          <p><strong>Total Cotización:</strong> {FormatPrice(getQuoteTotal())}</p>
        </div>
        <div className="terms">
          <p><strong>Condiciones:</strong></p>
          <p>Esta cotización es válida por 30 días. Precios no incluyen IVA.</p>
        </div>
      </footer>
    </div>
  );
});
