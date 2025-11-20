import { useEffect } from 'react'

function CartDrawer({ open, items, onClose, onCheckout }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-slate-900 border-l border-white/10 transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button className="text-slate-300 hover:text-white" onClick={onClose}>Close</button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-slate-300">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3">
                <div className="w-16 h-12 bg-slate-800 rounded overflow-hidden">
                  {it.product?.imageUrl && (
                    <img src={`${it.product.imageUrl}&auto=format&fit=crop&w=200&q=40`} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{it.product?.title}</p>
                  <p className="text-slate-300 text-xs">Qty {it.quantity}</p>
                </div>
                <p className="text-blue-400 text-sm font-semibold">${Number(it.product?.price || 0).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t border-white/10">
          <button onClick={onCheckout} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
