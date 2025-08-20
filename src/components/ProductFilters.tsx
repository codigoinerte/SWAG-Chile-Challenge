import { categories, suppliers } from '../data/products'
import './ProductFilters.css'

interface ProductFiltersProps {
  selectedPriceFrom: number
  selectedPriceTo: number
  selectedCategory: string
  searchQuery: string
  sortBy: string
  selectedSupplier: string
  onSupplierChange: (supplier: string) => void
  onCategoryChange: (category: string) => void
  onSearchChange: (search: string) => void
  onSortChange: (sort: string) => void
  onChangePriceFrom: (price: number) => void
  onChangePriceTo: (price:number) => void
  onChangeReset:(isreset:boolean) => void
}

const ProductFilters = ({
  selectedPriceFrom,
  selectedPriceTo,
  selectedSupplier,
  selectedCategory,
  searchQuery,
  sortBy,
  onChangePriceFrom,
  onChangePriceTo,
  onSupplierChange,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onChangeReset
}: ProductFiltersProps) => {
  return (
    <div className="product-filters">
      <div className="filters-card">
        {/* Search Bar */}
        <div className="search-section">
          <div className="search-box">
            <span className="material-icons">search</span>
            <input
              type="text"
              placeholder="Buscar productos, SKU..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input p1"
            />
            {searchQuery && (
              <button 
                className="clear-search"
                onClick={() => onSearchChange('')}
              >
                <span className="material-icons">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Categorías</h3>
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => onCategoryChange(category.id)}
              >
                <span className="material-icons">{category.icon}</span>
                <span className="category-name l1">{category.name}</span>
                <span className="category-count l1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Ordenar por</h3>
          <select 
            value={sortBy} 
            onChange={(e) => onSortChange(e.target.value)}
            className="sort-select p1"
          >
            <option value="name">Nombre A-Z</option>
            <option value="price">Precio</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>

        {/* Quick Stats - Bug: hardcoded values instead of dynamic */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Proveedores</h3>
          <div className="supplier-list">
            {suppliers.map(supplier => (
              <div key={supplier.id} className={`supplier-item ${supplier.id === selectedSupplier ? 'active' : ''}`} onClick={() => onSupplierChange(supplier.id)}>
                <span className="supplier-name l1">{supplier.name}</span>
                <span className="supplier-count l1">{supplier.products}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filtrado de rango de precios */}
        <div className="filter-section">
          <h3 className="filter-title p1-medium">Precio</h3>
          <div className="prices-filter">
            <div className="price-filter"></div>
              <input
                type="number"
                placeholder="Desde"
                min={0}
                className="price-input p1"
                onChange={e => onChangePriceFrom(Number(e.target.value))}
                value={selectedPriceFrom > 0 ? selectedPriceFrom : ''}
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                placeholder="Hasta"
                min={0}
                className="price-input p1"
                onChange={e => onChangePriceTo(Number(e.target.value))}
                value={selectedPriceTo > 0 ? selectedPriceTo : ''}
              />
            </div>
          </div>
          {/* Botón de reset */}
          <div className="filter-section">
            <button
              className="reset-btn btn btn-primary cta1 "
              onClick={() => onChangeReset(true)}
              type="button"
            >
              <span className="material-icons">restart_alt</span>
              <span className="reset-text">Restablecer filtros</span>
            </button>
          </div>

        </div>
      </div>
  )
}

export default ProductFilters