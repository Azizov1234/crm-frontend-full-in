import { useState } from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS, BOSHQARISH_TABS } from '../../data/navData';
import { getIcon } from '../../utils/icons';

export default function Sidebar({ activeNav, onNavClick, activeTab, onTabClick }) {
  const [subOpen, setSubOpen] = useState(false);

  function handleNavClick(id) {
    if (id === 'boshqarish') {
      onNavClick('boshqarish');
      setSubOpen(true); 
    } else {
      setSubOpen(false);
      onNavClick(id);
    }
  }

  return (
    <div className="relative flex h-screen flex-shrink-0">
      {/* ── Main sidebar ── */}
      <aside className="relative z-20 flex h-full w-[72px] flex-col items-center bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 shadow-2xl">
        {/* Logo */}
        <div className="flex h-16 w-full items-center justify-center border-b border-blue-700/50">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-2 ring-white/20">
            <span className="text-[11px] font-black tracking-tight text-white">CRM</span>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex flex-1 flex-col items-center gap-1 py-4 w-full px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = getIcon(item.icon);
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                className={`group relative flex w-full flex-col items-center justify-center rounded-xl py-2.5 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white/20 shadow-lg ring-1 ring-white/30'
                    : 'hover:bg-white/10'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-white" />
                )}
                <div className="relative">
                  <Icon
                    size={20}
                    className={isActive ? 'text-white' : 'text-blue-300 group-hover:text-white'}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`mt-1 text-[9px] font-medium leading-none ${
                    isActive ? 'text-white' : 'text-blue-300/80 group-hover:text-white'
                  }`}
                >
                  {item.label.length > 9 ? item.label.slice(0, 9) : item.label}
                </span>
                {/* Tooltip */}
                <span className="pointer-events-none absolute left-full ml-3 z-50 hidden whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white shadow-xl group-hover:block">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Bottom avatar */}
        <div className="mb-4">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 ring-2 ring-white/30 flex items-center justify-center">
            <span className="text-xs font-bold text-white">A</span>
          </div>
        </div>
      </aside>

      {/* ── Sub sidebar (Boshqarish menu) ── */}
      {/* Backdrop: only visible when open, closes on click */}
      {subOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setSubOpen(false)}
        />
      )}

      <div
        className={`absolute left-[72px] top-0 z-30 h-full overflow-hidden bg-white shadow-2xl border-r border-gray-100 transition-all duration-300 ease-in-out ${
          subOpen ? 'w-56 opacity-100' : 'w-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* Sub header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-100 px-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-[9px] font-black text-white">B</span>
            </div>
            <span className="text-sm font-bold text-gray-800">Boshqarish</span>
          </div>
          <button
            onClick={() => setSubOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>

        {/* Sub nav items */}
        <nav className="py-2 overflow-y-auto h-[calc(100%-64px)]">
          {BOSHQARISH_TABS.map((tab) => {
            const Icon = getIcon(tab.icon);
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  onTabClick(tab.id);
                  setSubOpen(false); // close sidebar after selecting
                }}
                className={`group flex w-full items-center gap-3 px-4 py-2.5 text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div
                  className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-500'
                  }`}
                >
                  <Icon size={14} />
                </div>
                <span className="text-[13px] font-medium">{tab.label}</span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-500" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
