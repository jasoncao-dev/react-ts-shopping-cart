import { useFetch } from "../hooks/useFetch"
import { Col, Row, Spinner } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import Item from "../models/Item"

export function Store() {
    const { response, error, loading } = useFetch("http://localhost:3001/items")

    return (
        <>
            <h1>Store</h1>
            {!loading ? (<Row xs={1} md={2} lg={3} className="g-3">
                { response && response.map((item: Item) => (
                    <Col key={item.id}><StoreItem {...item} /></Col>
                ))}
            </Row>) : 
            (
                <div className="mx-auto w-100">
                    <Spinner animation="border" variant="primary"/>
                </div>
            )}
        </>
    )
}