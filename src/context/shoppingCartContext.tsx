import { createContext, useContext, useState } from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

type ShoppingCartContextProviderProps = {
    children: React.ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseItemQuantity: (id: number) => void
    decreaseItemQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: Array<CartItem>
}

type CartItem = {
    id: number
    quantity: number
}

export function ShoppingCartContextProvider({ children }: ShoppingCartContextProviderProps) {
    const [cartItems, setCartItems] = useLocalStorage<Array<CartItem>>("shopping-cart", [])
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0)

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [ ...currentItems, { id, quantity: 1 } ]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    else return item;
                })
            }
        })
    }

    function decreaseItemQuantity(id: number) {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id);
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    else return item;
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }


    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseItemQuantity,
            decreaseItemQuantity,
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
        }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}