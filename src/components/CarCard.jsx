function CarCard({ car, onAdd }) {
  return (
    <div className="group bg-white/5 backdrop-blur border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/40 transition-colors">
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
        {car.imageUrl ? (
          <img src={`${car.imageUrl}&auto=format&fit=crop&w=1200&q=60`} alt={car.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No image</div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-white">{car.title}</h3>
            <p className="text-slate-300 text-sm">{car.brand}</p>
          </div>
          <p className="text-blue-400 font-semibold">${car.price?.toLocaleString?.() || car.price}</p>
        </div>
        <p className="mt-2 text-slate-300 line-clamp-2 min-h-[40px]">{car.description}</p>
        <button onClick={() => onAdd(car)} className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default CarCard
