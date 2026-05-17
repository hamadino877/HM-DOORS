export default function About() {
  return (
    <section id="about" className="py-28 lg:py-36 px-6 lg:px-16 bg-[hsl(var(--dark-1))]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <div className="relative reveal">
          <img
            src="./images/door-hpl-2.jpg"
            alt="HM Doors Workshop"
            className="w-full aspect-[4/5] object-cover border-2 border-[hsl(var(--gold)/0.2)]"
          />
          <img
            src="./images/door-arch.jpg"
            alt="Door Detail"
            className="absolute -bottom-10 -left-10 w-[55%] aspect-square object-cover border-4 border-[hsl(var(--dark-1))] shadow-2xl"
          />
          <div className="absolute top-10 -right-10 bg-[hsl(var(--gold))] px-8 py-6 text-center text-[hsl(var(--dark-1))]">
            <span className="font-['Playfair_Display'] text-4xl font-black block">1926</span>
            <span className="text-xs font-bold tracking-wider">خبرة عريقة منذ</span>
          </div>
        </div>

        {/* Content */}
        <div className="pb-10">
          <div className="section-label reveal">من نحن</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '100ms' }}>
            <span className="text-[hsl(var(--gold))]">محمد محي الدين</span><br />للأبواب المصفحة والديكور
          </h2>

          <p className="reveal text-[hsl(var(--cream-dim))] leading-[2] text-base mt-8" style={{ transitionDelay: '200ms' }}>
            مرحباً بكم في معرض <strong>محمد محي الدين للأبواب المصفحة والديكور</strong>. نحن فخورون بامتداد خبرتنا العريقة في عالم الأخشاب والأبواب <strong>منذ عام ١٩٢٦</strong>، حيث نتخصص في توفير أرقى أنواع الأبواب المصفحة، وأبواب WPC المقاومة للماء، وأبواب غرف HPL، وأرقى الديكورات المنزلية بأعلى معايير الجودة في جمهورية مصر العربية.
          </p>
          <p className="reveal text-[hsl(var(--cream-dim))] leading-[2] text-base mt-5" style={{ transitionDelay: '300ms' }}>
            نهدف دائماً إلى الجمع بين الأمان التام والمظهر الجمالي الفخم الذي يضفي لمسة ملكية على منزلك. تشكيلتنا الواسعة تناسب جميع الأذواق والمساحات مع تقديم خدمة دعم فني وتركيب متميزة تضمن رضا عملائنا الكامل.
          </p>

          <ul className="mt-8 space-y-0">
            {[
              'أبواب مصفحة تركية وصينية بأعلى درجات الأمان والتحصين',
              'أبواب WPC مقاومة للماء والرطوبة بنسبة 100%',
              'ألواح بنلات وديكورات جدارية راقية وعصرية تناسب الفلل والشقق',
              'أنظمة تركيب هندسية دقيقة بفريق فني متخصص ودقيق في التنفيذ',
              'خدمة ما بعد البيع المتميزة وضمان حقيقي لراحة بال عملائنا',
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 py-3 border-b border-[hsl(var(--gold)/0.1)] text-[hsl(var(--cream-dim))] reveal"
                style={{ transitionDelay: `${350 + i * 50}ms` }}
              >
                <span className="text-[hsl(var(--gold))] flex-shrink-0">&#10022;</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
