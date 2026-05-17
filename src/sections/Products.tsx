import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Search, Send, Eye } from 'lucide-react'
import { catalogProducts, type Product } from '../data/catalog'

const filters = [
  { key: 'all', label: 'الكل' },
  { key: 'مصفحة', label: 'أبواب مصفحة' },
  { key: 'سادة', label: 'أبواب سادة' },
  { key: 'لونين', label: 'أبواب 2 لون' },
  { key: 'استانلس', label: 'أبواب أستانلس' },
  { key: 'حفر', label: 'أبواب حفر' },
  { key: 'بارز', label: 'أبواب بارز أكريليك' },
  { key: 'شبابيك', label: 'شبابيك مودرن' },
]

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(12)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(12)
  }, [activeFilter, searchQuery])

  // Filter products by category AND search query
  const filtered = catalogProducts.filter((product) => {
    const matchesCategory = activeFilter === 'all' || product.category === activeFilter
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  // Paginated items to render
  const renderedProducts = filtered.slice(0, visibleCount)

  // Lightbox Navigation
  const openLightbox = (idx: number) => setLightboxIndex(idx)
  const closeLightbox = () => setLightboxIndex(null)

  const nextImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null
      return prevIndex === filtered.length - 1 ? 0 : prevIndex + 1
    })
  }

  const prevImage = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prevIndex) => {
      if (prevIndex === null) return null
      return prevIndex === 0 ? filtered.length - 1 : prevIndex - 1
    })
  }

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'ArrowRight') {
        // RTL friendly navigation
        prevImage()
      } else if (e.key === 'ArrowLeft') {
        nextImage()
      } else if (e.key === 'Escape') {
        closeLightbox()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filtered.length])

  // Order on WhatsApp handler
  const handleWhatsAppOrder = (product: Product) => {
    const phoneNumber = '201024209955'
    const message = `مرحباً HM Doors، أرغب في الاستفسار عن:\n⭐ *${product.name}*\n🏷️ كود المنتج: *${product.code}*\n📁 القسم: *${product.category}*`
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank')
  }

  return (
    <section id="products" className="py-28 lg:py-36 px-6 lg:px-16 bg-[hsl(var(--dark-2))] relative">
      
      {/* Background visual elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[hsl(var(--gold)/0.03)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[hsl(var(--gold)/0.02)] rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 mb-10">
          <div>
            <div className="section-label reveal">كتالوج المنتجات الجديد</div>
            <h2 className="section-title reveal mb-0" style={{ transitionDelay: '100ms' }}>
              تصفح الأبواب <span className="text-[hsl(var(--gold))]">بسهولة</span> ويسر
            </h2>
            <p className="text-xs text-[hsl(var(--cream-dim))] mt-2 max-w-xl">
              يمكنك البحث برقم الكود أو الاسم، أو تصفية الأبواب حسب القسم. اضغط على أي باب لفتحه ومعاينته بالحجم الكامل والطلب مباشرة عبر واتساب.
            </p>
          </div>

          {/* Search Bar & Category filter */}
          <div className="w-full xl:w-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center reveal" style={{ transitionDelay: '200ms' }}>
            {/* Search Box */}
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="ابحث بالكود، الاسم، أو الميزة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[hsl(var(--dark-3))] border border-[hsl(var(--gold)/0.25)] text-[hsl(var(--cream))] placeholder-[hsl(var(--cream-dim)/0.5)] rounded-full px-5 py-2.5 pl-10 text-sm focus:outline-none focus:border-[hsl(var(--gold))] focus:ring-1 focus:ring-[hsl(var(--gold))] transition-all font-sans text-right"
                dir="rtl"
              />
              <Search size={16} className="absolute left-4 top-3 text-[hsl(var(--gold)/0.6)]" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-10 top-3 text-[hsl(var(--cream-dim)/0.5)] hover:text-[hsl(var(--gold))]"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories Tabs Row (With Mobile Swipeable Support) */}
        <div className="reveal" style={{ transitionDelay: '250ms' }}>
          <div 
            className="flex gap-2 overflow-x-auto pb-3 scrollbar-none flex-nowrap select-none border-b border-[hsl(var(--gold)/0.1)]"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => {
                  setActiveFilter(f.key)
                  setSearchQuery('')
                }}
                className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-bold transition-all duration-300 flex-shrink-0 ${
                  activeFilter === f.key
                    ? 'bg-[hsl(var(--gold)/0.15)] border-[hsl(var(--gold))] text-[hsl(var(--gold))]'
                    : 'border-transparent text-[hsl(var(--cream-dim))] hover:bg-[hsl(var(--dark-3))] hover:text-[hsl(var(--cream))]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[hsl(var(--dark-3))] border border-dashed border-[hsl(var(--gold)/0.2)] rounded-sm">
            <Search size={40} className="mx-auto text-[hsl(var(--gold)/0.4)] mb-4" />
            <h3 className="text-lg font-bold text-[hsl(var(--cream))] mb-1">لم نجد أي نتائج</h3>
            <p className="text-sm text-[hsl(var(--cream-dim))]">جرب استخدام كلمات بحث أخرى أو قم بتغيير القسم</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {renderedProducts.map((product, idx) => {
                // Find index of this product in the filtered list
                const actualIndex = idx
                return (
                  <div
                    key={product.id}
                    onClick={() => openLightbox(actualIndex)}
                    className="group overflow-hidden rounded bg-[hsl(var(--dark-3))] border border-[hsl(var(--gold)/0.12)] hover:border-[hsl(var(--gold)/0.5)] transition-all duration-400 cursor-pointer flex flex-col justify-between shadow-lg hover:-translate-y-1.5 hover:shadow-2xl"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-700 brightness-[0.9] group-hover:brightness-100 group-hover:scale-105"
                      />
                      
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-3 right-3 bg-[hsl(var(--gold))] text-[hsl(var(--dark-0))] text-[9px] sm:text-[10px] font-black tracking-wide px-2.5 py-1 rounded-sm z-10 select-none shadow">
                          {product.badge}
                        </div>
                      )}

                      {/* Hover Info Action Overlay */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 rounded-full bg-[hsl(var(--gold))] text-[hsl(var(--dark-0))] flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye size={20} />
                        </div>
                      </div>
                    </div>

                    {/* Description Area */}
                    <div className="p-4 bg-[hsl(var(--dark-3))] flex flex-col gap-2.5 border-t border-[hsl(var(--gold)/0.08)]">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] font-mono text-[hsl(var(--gold))] font-semibold select-all">
                          {product.code}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] rounded-full text-[hsl(var(--gold))] font-medium">
                          {product.category}
                        </span>
                      </div>

                      <h3 className="font-sans font-bold text-sm text-[hsl(var(--cream))] line-clamp-1 group-hover:text-[hsl(var(--gold))] transition-colors">
                        {product.name}
                      </h3>

                      {/* Tags and WhatsApp action */}
                      <div className="flex justify-between items-center mt-1 border-t border-[hsl(var(--gold)/0.05)] pt-2.5">
                        <div className="flex gap-1 flex-wrap max-w-[70%]">
                          {product.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] text-[hsl(var(--cream-dim))] bg-[hsl(var(--dark-4))] border border-transparent px-2 py-0.5 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleWhatsAppOrder(product)
                          }}
                          className="p-1.5 rounded-sm bg-[hsl(var(--gold)/0.08)] hover:bg-[hsl(var(--gold))] text-[hsl(var(--gold))] hover:text-black transition-all duration-300 border border-[hsl(var(--gold)/0.15)] hover:border-transparent"
                          title="طلب سريع عبر واتساب"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.09-3.95c1.642.975 3.256 1.488 4.887 1.489 5.437.002 9.856-4.417 9.86-9.858.002-2.635-1.02-5.11-2.885-6.978C16.146 2.837 13.673 1.814 11.98 1.814c-5.441 0-9.86 4.417-9.864 9.858-.002 2.01.526 3.972 1.53 5.717l-1.002 3.66 3.766-.988z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
              <div className="text-center mt-16">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-8 py-3.5 rounded-full border border-[hsl(var(--gold)/0.4)] text-[hsl(var(--gold))] text-sm font-bold bg-transparent hover:bg-[hsl(var(--gold))] hover:text-black hover:border-transparent transition-all duration-300 shadow-lg"
                >
                  مشاهدة المزيد من الأبواب ({filtered.length - visibleCount} متبقي)
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Stunning Interactive Fullscreen Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col justify-between items-center py-6 px-4 select-none animate-fadeIn animate-duration-300">
          
          {/* Lightbox Top Control Bar */}
          <div className="w-full max-w-5xl flex justify-between items-center px-4">
            <button
              onClick={closeLightbox}
              className="p-2 text-[hsl(var(--cream-dim))] hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>
            <div className="text-[hsl(var(--cream))] text-xs font-mono select-none">
              {lightboxIndex + 1} / {filtered.length}
            </div>
            <div className="text-[hsl(var(--gold))] font-bold text-xs select-none">
              HM Doors Catalog
            </div>
          </div>

          {/* Lightbox Image Stage */}
          <div className="relative w-full max-w-3xl flex-1 flex items-center justify-center my-4 group">
            {/* Previous button */}
            <button
              onClick={prevImage}
              className="absolute left-2 md:left-4 z-10 p-3 bg-black/60 md:bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all md:opacity-0 group-hover:opacity-100"
              title="السابق"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Image display */}
            <img
              src={filtered[lightboxIndex].image}
              alt={filtered[lightboxIndex].name}
              className="max-w-full max-h-[70vh] md:max-h-[75vh] object-contain rounded border border-white/5 shadow-2xl animate-scaleIn"
            />

            {/* Next button */}
            <button
              onClick={nextImage}
              className="absolute right-2 md:right-4 z-10 p-3 bg-black/60 md:bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all md:opacity-0 group-hover:opacity-100"
              title="التالي"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Lightbox Bottom Info Panel */}
          <div className="w-full max-w-2xl bg-[hsl(var(--dark-3))] border border-[hsl(var(--gold)/0.15)] rounded-lg p-5 md:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-stretch md:items-center gap-5 text-right" dir="rtl">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-[hsl(var(--gold))] font-bold px-2 py-0.5 bg-[hsl(var(--gold)/0.08)] border border-[hsl(var(--gold)/0.2)] rounded-sm select-all">
                  كود الموديل: {filtered[lightboxIndex].code}
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-white/5 text-[hsl(var(--cream-dim))] rounded-full">
                  القسم: {filtered[lightboxIndex].category}
                </span>
              </div>
              
              <h3 className="font-sans font-black text-lg md:text-xl text-[hsl(var(--cream))]">
                {filtered[lightboxIndex].name}
              </h3>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mt-1">
                {filtered[lightboxIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 bg-[hsl(var(--dark-4))] text-[hsl(var(--cream-dim))] border border-white/5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Order Call to Action */}
            <button
              onClick={() => handleWhatsAppOrder(filtered[lightboxIndex])}
              className="flex-shrink-0 flex items-center justify-center gap-3 bg-[hsl(var(--gold))] hover:bg-[hsl(var(--gold-light))] text-black font-black text-sm px-6 py-3.5 rounded transition-all duration-300 shadow-lg active:scale-95"
            >
              <Send size={16} />
              <span>اطلب هذا الباب الآن</span>
            </button>
          </div>
          
        </div>
      )}
    </section>
  )
}
