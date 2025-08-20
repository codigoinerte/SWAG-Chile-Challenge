  // Format price display
  export const FormatPrice = (price: number) => {
    return price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
  }