import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shoppingCartContext";
import { useFetch } from "../hooks/useFetch";
import Item from "../models/Item";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem, CartItemProps } from "./CartItem";

type ShoppingCartProps = {
    isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();
    const { response } = useFetch(`http://localhost:3001/items`);

    const calculateTotal = (cartItems: any[]) => {
        if (response) {
            return cartItems.reduce((total: number, item: CartItemProps) => {
                const itemPrice = response.find((i: Item) => i.id === item.id)?.price || 0;
                return total + (itemPrice * item.quantity);
            }, 0)
        }
    }

    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                { cartItems && cartItems.length > 0 &&
                    (<Stack gap={3}>
                    { cartItems.map(cartItem => (
                        <CartItem key={cartItem.id} {...cartItem}/>
                    )) }
                    <div className="ms-auto fw-bold fs-5">
                        Total: { formatCurrency(calculateTotal(cartItems)) }
                    </div>
                    </Stack>
                )
                }
                { cartItems && cartItems.length === 0 && (<div className="text-center">Your cart is empty</div>) }
            </Offcanvas.Body>
        </Offcanvas>
    )
}