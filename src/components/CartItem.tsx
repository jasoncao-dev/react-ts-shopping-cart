import { useFetch } from "../hooks/useFetch"
import { useShoppingCart } from "../context/shoppingCartContext"
import { Button, Stack } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"

export type CartItemProps = {
    id: number
    quantity: number
}
export function CartItem({ id, quantity }: CartItemProps) {
    const { removeFromCart } = useShoppingCart()
    const { response, error, loading } = useFetch(`http://localhost:3001/items/${id}`)

    return (
        <>
            {response && (<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
                <img src={response.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }}/>
                <div className="me-auto">
                    <div>
                        {response.name} { quantity > 1 && (<span className="text-muted" style={{ fontSize: ".65rem" }}>x{quantity}</span>) }
                    </div>
                    <div className="text-muted" style={{ fontSize: ".75rem" }}>{formatCurrency(response.price)}</div>
                </div>
                <div>{formatCurrency(response.price * quantity)}</div>
                <Button variant="danger" onClick={() => removeFromCart(id)}>x</Button>
            </Stack>)}
        </>
    )
}