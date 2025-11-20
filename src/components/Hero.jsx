import Spline from '@splinetool/react-spline'

function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8fw9Z-c-rqW3nWBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl bg-slate-900/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 pointer-events-none">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Drive the Future
            </h1>
            <p className="mt-4 text-slate-200 text-lg md:text-xl">
              Explore performance cars in 3D. Configure, compare, and buy with confidence.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
    </section>
  )
}

export default Hero