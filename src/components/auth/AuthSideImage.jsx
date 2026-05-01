export default function AuthSideImage() {
  return (
    <section className="relative hidden min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 lg:flex">
      {/* Background decorative circles */}
      <div className="absolute top-[-80px] left-[-80px] h-[400px] w-[400px] rounded-full bg-blue-700/30 blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-60px] h-[500px] w-[500px] rounded-full bg-cyan-600/20 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center px-12">
        {/* CRM Logo */}
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-2xl ring-2 ring-white/20 backdrop-blur-sm">
          <span className="text-3xl font-black tracking-tighter text-white">CRM</span>
        </div>

        <h2 className="text-4xl font-black text-white leading-tight tracking-tight">
          Mijozlar bilan<br />
          <span className="text-cyan-300">munosabatlarni</span><br />
          boshqaring
        </h2>

        <p className="mt-4 max-w-xs text-blue-200 text-[15px] leading-relaxed">
          Zamonaviy CRM tizimi bilan biznesingizni yangi darajaga olib chiqing
        </p>

        {/* Feature list */}
        <div className="mt-10 flex flex-col gap-3 text-left w-full max-w-xs">
          {[
            "✓ Talabalar va o'qituvchilarni boshqarish",
            '✓ Kurs va xonalarni nazorat qilish',
            '✓ Moliyaviy hisobotlar',
          ].map((feature, idx) => (
            <div key={idx} className="text-[13px] text-blue-100">
              {feature}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 flex gap-3">
          {[
            { num: '1,248', label: 'Talabalar' },
            { num: '86', label: "O'qituvchilar" },
            { num: '34', label: 'Kurslar' },
          ].map((item, idx) => (
            <div key={idx} className="rounded-2xl bg-white/10 px-4 py-3 text-center ring-1 ring-white/20">
              <p className="text-xl font-black text-white">{item.num}</p>
              <p className="text-[10px] text-blue-300 mt-0.5">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
