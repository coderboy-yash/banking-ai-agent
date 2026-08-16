export function PageBanner({ title, subtitle, image }: { title: string; subtitle: string; image: string }) {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-white/70 max-w-xl">{subtitle}</p>
      </div>
    </section>
  )
}
