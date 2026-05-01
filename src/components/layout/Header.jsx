import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header({ title }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200/80 bg-white/80 px-6 backdrop-blur-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <div className="relative hidden sm:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Qidirish..."
            className="h-9 w-56 rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 text-[13px] text-gray-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Language */}
        <button className="flex items-center gap-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-[13px] font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
          <span>O'zbekcha</span>
          <ChevronDown size={13} className="text-gray-400" />
        </button>

        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
          <Bell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-md ring-2 ring-blue-100 flex items-center justify-center">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-[12px] font-semibold text-gray-800 leading-none">Abdulaziz</p>
            <p className="text-[11px] text-gray-400 leading-none mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
