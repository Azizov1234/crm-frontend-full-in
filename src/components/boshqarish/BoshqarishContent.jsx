import { BOSHQARISH_TABS } from '../../data/navData';
import { getIcon } from '../../utils/icons';
import KurslarPage from './KurslarPage';
import XonalarPage from './XonalarPage';
import HodimlarPage from './HodimlarPage';

function PlaceholderPage({ label }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center py-24">
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
          <span className="text-3xl">📋</span>
        </div>
        <h2 className="text-xl font-bold text-gray-700">{label}</h2>
        <p className="mt-2 text-sm text-gray-400">Bu bo'lim tez orada qo'shiladi</p>
      </div>
    </div>
  );
}

const PAGE_MAP = {
  kurslar:  <KurslarPage />,
  xonalar:  <XonalarPage />,
  hodimlar: <HodimlarPage />,
};

export default function BoshqarishContent({ activeTab, onTabClick }) {
  const activeTabData = BOSHQARISH_TABS.find((t) => t.id === activeTab);
  const content = PAGE_MAP[activeTab] || <PlaceholderPage label={activeTabData?.label ?? ''} />;

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Page header + horizontal tabs */}
      <div className="border-b border-gray-200 bg-white px-6 pt-5">
        <h2 className="text-xl font-bold text-gray-800">Boshqarish</h2>
        <p className="mt-0.5 text-sm text-gray-400">
          Tizimni sozlash va boshqarish imkoniyatlari
        </p>

        {/* Tabs */}
        <div className="mt-4 flex items-center overflow-x-auto">
          {BOSHQARISH_TABS.map((tab) => {
            const Icon = getIcon(tab.icon);
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => onTabClick(tab.id)}
                className={`group relative flex shrink-0 items-center gap-1.5 whitespace-nowrap px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon
                  size={13}
                  className={`flex-shrink-0 ${
                    isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-t-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {content}
      </div>
    </div>
  );
}
