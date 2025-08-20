
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product';
import { getPricingInfoForQuantity } from './cartStore'; // Reutilizamos el helper de precios

// Alias para los items del cotizador, es la misma estructura que CartItem
export type QuoteItem = import('./cartStore').CartItem;

// Estructura para los datos de la empresa
interface CompanyInfo {
  name: string;
  rut: string; // RUT para Chile u otro ID
  address: string;
  phone: string;
  email: string;
}

// Define la estructura del estado del cotizador
interface QuoteState {
  items: QuoteItem[];
  companyInfo: CompanyInfo;
  addItem: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeItem: (productId: number, color?: string, size?: string) => void;
  updateItemQuantity: (productId: number, quantity: number, color?: string, size?: string) => void;
  updateCompanyInfo: (field: keyof CompanyInfo, value: string) => void;
  clearQuote: () => void;
  getTotalItems: () => number;
  getQuoteTotal: () => number;
}

export const useQuoteStore = create<QuoteState>()(
  persist(
    (set, get) => ({
      items: [],
      companyInfo: {
        name: '',
        rut: '',
        address: '',
        phone: '',
        email: ''
      },

      // Acción para agregar un item
      addItem: (product, quantity, color, size) => {
        const { items } = get();
        const itemIdentifier = `${product.id}-${color || ''}-${size || ''}`;
        const existingItemIndex = items.findIndex(
          item => `${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}` === itemIdentifier
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          const newItem: QuoteItem = { ...product, quantity, selectedColor: color, selectedSize: size };
          set({ items: [...items, newItem] });
        }
      },

      // Acción para remover un item
      removeItem: (productId, color, size) => {
        const itemIdentifier = `${productId}-${color || ''}-${size || ''}`;
        set({ items: get().items.filter(item => `${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}` !== itemIdentifier) });
      },

      // Acción para actualizar la cantidad de un item
      updateItemQuantity: (productId, quantity, color, size) => {
        const itemIdentifier = `${productId}-${color || ''}-${size || ''}`;
        set({
          items: get().items.map(item => {
            if (`${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}` === itemIdentifier) {
              return { ...item, quantity: quantity > 0 ? quantity : 1 };
            }
            return item;
          }),
        });
      },

      // Acción para actualizar los datos de la empresa
      updateCompanyInfo: (field, value) => {
        set(state => ({ companyInfo: { ...state.companyInfo, [field]: value } }));
      },

      // Acción para vaciar la cotización
      clearQuote: () => set({ items: [], companyInfo: { name: '', rut: '', address: '', phone: '', email: '' } }),

      // Selector para obtener el número total de productos
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Selector para obtener el precio total
      getQuoteTotal: () => {
        return get().items.reduce((total, item) => {
          const { unitPrice } = getPricingInfoForQuantity(item);
          return total + unitPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'quotation-storage', // Nombre para el item en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
