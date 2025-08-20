import { useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import { products as allProducts } from '../data/products'
import { Product } from '../types/Product'
import './ProductList.css'

interface FilterProducts {
  category: string;
  search: string;
  sort: string;
  supplierFilter: string;
  priceFrom: number;
  priceTo: number;
}

const ProductList = () => {
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const [priceFrom, setPriceFrom] = useState(0);
  const [priceTo, setPriceTo] = useState(0);

  /* standarize string to search */
  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  // Filter and sort products based on criteria
  const filterProducts = ({
      category,
      search,
      sort,
      supplierFilter,
      priceFrom,
      priceTo
   }: FilterProducts) => {

    let filtered = [...allProducts]

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category)
    }

    // Search filter
    if (search) {
      filtered = filtered.filter(product => 
        (normalizeString(product.name)).includes(normalizeString(search)) ||
        (normalizeString(product.sku)).includes(normalizeString(search))
      )
    }

    // Sorting logic
    switch (sort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'price':
        // Price sorting to implement
        /* price sorting from lowest to highest */
        filtered.sort((a,b) => a.basePrice - b.basePrice)
        break
      case 'stock':
        filtered.sort((a, b) => b.stock - a.stock)
        break
      default:
        break
    }

    if(supplierFilter != 'all')
      filtered = filtered.filter((product) => product.supplier === supplierFilter);

    if (!(priceFrom === 0 && priceTo === 0)) {
      filtered = filtered.filter(product => {
        const price = product.basePrice;
        if (priceFrom !== 0 && priceTo !== 0) {
          return price >= priceFrom && price <= priceTo;
        }
        if (priceFrom !== 0) {
          return price >= priceFrom;
        }
        if (priceTo !== 0) {
          return price <= priceTo;
        }
        return true;
      });
    }

    

    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterProducts({
      category,
      search:searchQuery,
      sort: sortBy,
      supplierFilter,
      priceFrom,
      priceTo
    })
  }

  const handleSearchChange = (search: string) => {
    setSearchQuery(search)
    filterProducts({
      category: selectedCategory,
      search,
      sort: sortBy,
      supplierFilter,
      priceFrom,
      priceTo
    })
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    filterProducts({
      category: selectedCategory,
      search: searchQuery,
      sort,
      supplierFilter,
      priceFrom,
      priceTo
    })
  }

  const handleSupplierChange = (supplier: string) => {
    setSupplierFilter(supplier);
    filterProducts({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy,
      supplierFilter: supplier,
      priceFrom,
      priceTo
    })
  }

  const handlePriceFrom = (priceFrom:number) => {
    setPriceFrom(priceFrom);
    filterProducts({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy,
      supplierFilter,
      priceFrom,
      priceTo
    })
  }

  const handlePriceTo = (priceTo:number) => {
    setPriceTo(priceTo);
    filterProducts({
      category: selectedCategory,
      search: searchQuery,
      sort: sortBy,
      supplierFilter,
      priceFrom,
      priceTo
    })
  } 

  const setReset = () => {
      filterProducts({
        category: 'all',
        search: '',
        sort: 'sortBy',
        supplierFilter: 'all',
        priceFrom: 0,
        priceTo: 0
      });

    setSupplierFilter('all');
    setSelectedCategory('all');
    setSearchQuery('');
    setSortBy('name');
    setPriceFrom(0);
    setPriceTo(0);
  }

  const handleReset = (isReset:boolean) =>  (isReset) && setReset();

  return (
    <div className="product-list-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-info">
            <h1 className="page-title h2">Catálogo de Productos</h1>
            <p className="page-subtitle p1">
              Descubre nuestra selección de productos promocionales premium
            </p>
          </div>
          
          <div className="page-stats">
            <div className="stat-item">
              <span className="stat-value p1-medium">{filteredProducts.length}</span>
              <span className="stat-label l1">productos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value p1-medium">6</span>
              <span className="stat-label l1">categorías</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          selectedPriceFrom={priceFrom}
          selectedPriceTo={priceTo}
          selectedSupplier={supplierFilter}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          sortBy={sortBy}
          onSupplierChange={handleSupplierChange}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
          onChangePriceFrom={handlePriceFrom}
          onChangePriceTo={handlePriceTo}
          onChangeReset={handleReset}
        />

        {/* Products Grid */}
        <div className="products-section">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <span className="material-icons">search_off</span>
              <h3 className="h2">No hay productos</h3>
              <p className="p1">No se encontraron productos que coincidan con tu búsqueda.</p>
              <button 
                className="btn btn-primary cta1"
                onClick={setReset}
              >
                Ver todos los productos
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductList