import { create } from 'zustand'
import type { GetMeResponse } from '../types/user'

//TODO--------------
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
}
//------------------

interface UserState {
  user: GetMeResponse | null
  cart: CartItem[]

  setUser: (user: GetMeResponse) => void
  clearUser: () => void

  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
  updateQuantity: (id: number, quantity: number) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  cart: [],

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, cart: [] }),

  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((i) => i.id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
}))
