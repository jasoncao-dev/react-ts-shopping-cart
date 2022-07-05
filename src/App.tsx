import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home, About, Store } from './pages'
import { Navbar } from './components'
import { ShoppingCartContextProvider } from './context/shoppingCartContext'

function App() {
  return (
    <ShoppingCartContextProvider>
    <Navbar />
    <Container className="mb-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Container>
    </ShoppingCartContextProvider>
  )
}

export default App
