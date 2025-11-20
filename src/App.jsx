import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import CarCard from './components/CarCard'
import CartDrawer from './components/CartDrawer'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [cars, setCars] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const sessionId = useMemo(() => {
    const existing = localStorage.getItem('session_id')
    if (existing) return existing
    const id = crypto.randomUUID()
    localStorage.setItem('session_id', id)
    return id
  }, [])

  const fetchCars = async () => {
    const r = await fetch(`${baseUrl}/cars`)
    if (r.ok) {
      const data = await r.json()
      setCars(data)
    }
  }

  const fetchCart = async () => {
    const r = await fetch(`${baseUrl}/cart/${sessionId}`)
    if (r.ok) setCartItems(await r.json())
  }

  const ensureSeed = async () => {
    const r = await fetch(`${baseUrl}/cars`)
    if (r.ok) {
      const data = await r.json()
      if (!data || data.length === 0) {
        await fetch(`${baseUrl}/seed`, { method: 'POST' })
      }
    }
  }

  useEffect(() => {
    (async () => {
      await ensureSeed()
      await fetchCars()
      await fetchCart()
    })()
  }, [])

  const onAdd = async (car) => {
    await fetch(`${baseUrl}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId, product_id: car.id, quantity: 1 })
    })
    setCartOpen(true)
    await fetchCart()
  }

  const onCheckout = async () => {
    const r = await fetch(`${baseUrl}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId })
    })
    if (r.ok) {
      const data = await r.json()
      alert(`Order placed! Total: $${data.total}`)
      setCartOpen(false)
      await fetchCart()
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />

      <header className="sticky top-0 z-40 bg-slate-950/70 backdrop-blur border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-400" />
            <p className="font-bold">Flames Auto</p>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-slate-300">
            <a href="#" className="hover:text-white">Models</a>
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Support</a>
          </nav>
          <button onClick={() => setCartOpen(true)} className="bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 rounded-lg">Cart ({cartItems.length})</button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Cars</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} onAdd={onAdd} />)
          )}
        </div>
      </main>

      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} onCheckout={onCheckout} />

      <footer className="border-t border-white/10 mt-16">
        <div className="container mx-auto px-6 py-8 text-slate-400 text-sm">
          © {new Date().getFullYear()} Flames Auto. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
