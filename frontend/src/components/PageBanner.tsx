export function PageBanner({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-3 text-white/70 max-w-xl">{subtitle}</p>
      </div>
    </section>
  )
}
