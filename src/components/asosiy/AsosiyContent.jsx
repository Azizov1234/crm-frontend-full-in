import { Users, GraduationCap, BookOpen, TrendingUp, ArrowUp } from 'lucide-react';

export default function AsosiyContent() {
  const stats = [
    { label: 'Talabalar',      value: '248',  Icon: GraduationCap, color: 'from-blue-500 to-blue-600',    change: '+12%' },
    { label: "O'qituvchilar",  value: '18',   Icon: Users,         color: 'from-cyan-500 to-cyan-600',    change: '+5%'  },
    { label: 'Kurslar',        value: '12',   Icon: BookOpen,      color: 'from-indigo-500 to-indigo-600', change: '+3%'  },
    { label: "Faol guruhlar",  value: '34',   Icon: TrendingUp,    color: 'from-violet-500 to-violet-600', change: '+8%'  },
  ];

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-700 px-8 py-10">
        {/* decorative blobs */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 right-32 h-40 w-40 rounded-full bg-cyan-400/10" />

        <p className="text-[13px] font-medium text-blue-200 mb-1">Xush kelibsiz 👋</p>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Salom, <span className="text-cyan-300">Abdulaziz</span>!
        </h1>
        <p className="mt-2 text-blue-200 text-sm max-w-sm">
          Bugun ham samarali ish kuni bo'lsin. Tizim to'liq ishlayapti.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[12px] text-blue-100 ring-1 ring-white/20">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Tizim faol
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 p-6 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} shadow-md`}>
              <stat.Icon size={20} className="text-white" />
            </div>
            <p className="text-2xl font-black text-gray-800">{stat.value}</p>
            <p className="text-[12px] text-gray-500 mt-0.5">{stat.label}</p>
            <div className="mt-2 flex items-center gap-1">
              <ArrowUp size={11} className="text-green-500" />
              <span className="text-[11px] font-semibold text-green-600">{stat.change}</span>
              <span className="text-[11px] text-gray-400">bu oy</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="mx-6 mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-500" />
            So'nggi faollik
          </h3>
          <button className="text-[12px] font-medium text-blue-600 hover:underline cursor-pointer">
            Hammasini ko'rish
          </button>
        </div>
        <div className="space-y-2">
          {[
            { action: "Yangi talaba qo'shildi", name: 'Asilbek Toshmatov',   time: '2 daqiqa avval',  color: 'bg-green-100 text-green-700'  },
            { action: 'Kurs yangilandi',          name: 'React.js kursi',      time: '15 daqiqa avval', color: 'bg-blue-100 text-blue-700'    },
            { action: "To'lov qabul qilindi",     name: "500,000 so'm",        time: '1 soat avval',    color: 'bg-purple-100 text-purple-700'},
            { action: "Xona qo'shildi",           name: '10-xona',             time: '2 soat avval',    color: 'bg-cyan-100 text-cyan-700'    },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 rounded-xl p-3 transition hover:bg-gray-50">
              <span className={`shrink-0 rounded-lg px-2 py-0.5 text-[11px] font-semibold ${item.color}`}>
                {item.action}
              </span>
              <span className="text-[13px] text-gray-700 font-medium truncate">{item.name}</span>
              <span className="ml-auto shrink-0 text-[11px] text-gray-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
