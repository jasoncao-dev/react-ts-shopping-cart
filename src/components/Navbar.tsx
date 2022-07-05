import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/shoppingCartContext"
export function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart()
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/store">Store</Nav.Link>
                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                </Nav>
                { cartQuantity > 0 && (<Button onClick={openCart} style={{ width: "3rem", height: "3rem", position: "relative" }} variant="outline-primary" className="rounded-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="rounded-circle bg-danger d-flex justify-content-center align-content-center" style={{ color: "white", width: "1.5rem", height: "1.5rem", position: "absolute", bottom: 0, right: 0, transform: "translate(25%, 25%)" }}>{cartQuantity}</div>
                </Button>)}
            </Container>
        </NavbarBs>
    )
}