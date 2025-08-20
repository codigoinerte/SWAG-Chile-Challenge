
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '../types/Product';

// Define la estructura de un item dentro del carrito
export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

// Define la estructura del estado del carrito
interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, color?: string, size?: string) => void;
  removeItem: (productId: number, color?: string, size?: string) => void;
  updateItemQuantity: (productId: number, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
}

// Función HELPER para obtener el precio y descuento basado en la cantidad
export const getPricingInfoForQuantity = (item: CartItem): { unitPrice: number, discount?: number } => {
  const { priceBreaks, basePrice, quantity } = item;
  if (!priceBreaks || priceBreaks.length === 0) {
    return { unitPrice: basePrice };
  }

  const sortedBreaks = [...priceBreaks].sort((a, b) => b.minQty - a.minQty);
  const applicableBreak = sortedBreaks.find(br => quantity >= br.minQty);

  if (applicableBreak) {
    return { unitPrice: applicableBreak.price, discount: applicableBreak.discount };
  }

  return { unitPrice: basePrice };
};


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // Acción para agregar un item al carrito
      addItem: (product, quantity, color, size) => {
        const { items } = get();
        // Un identificador único para la variante del producto
        const itemIdentifier = `${product.id}-${color || ''}-${size || ''}`;

        const existingItemIndex = items.findIndex(
          item => `${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}` === itemIdentifier
        );

        if (existingItemIndex > -1) {
          // Si el item ya existe, actualizamos la cantidad
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
        } else {
          // Si es un item nuevo, lo agregamos al carrito
          const newItem: CartItem = {
            ...product,
            quantity,
            selectedColor: color,
            selectedSize: size,
          };
          set({ items: [...items, newItem] });
        }
      },

      // Acción para remover un item del carrito
      removeItem: (productId, color, size) => {
        const itemIdentifier = `${productId}-${color || ''}-${size || ''}`;
        set({
          items: get().items.filter(
            item => `${item.id}-${item.selectedColor || ''}-${item.selectedSize || ''}` !== itemIdentifier
          ),
        });
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

      // Acción para vaciar el carrito
      clearCart: () => set({ items: [] }),

      // Selector para obtener el número total de productos en el carrito
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      // Selector para obtener el precio total del carrito
      getCartTotal: () => {
        return get().items.reduce((total, item) => {
          const { unitPrice } = getPricingInfoForQuantity(item);
          return total + unitPrice * item.quantity;
        }, 0);
      },
    }),
    {
      name: 'shopping-cart-storage', // Nombre para el item en localStorage
      storage: createJSONStorage(() => localStorage), // Usa localStorage para la persistencia
    }
  )
);
