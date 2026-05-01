import { useState } from 'react';
import { Toaster } from 'sonner';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import AsosiyContent from '../components/asosiy/AsosiyContent';
import BoshqarishContent from '../components/boshqarish/BoshqarishContent';
import OqituvchilarPage from './OqituvchilarPage';

const NAV_LABELS = {
  asosiy:     'Asosiy',
  talabalar:  "O'qituvchilar",
  guruhlar:   'Guruhlar',
  talaba:     'Talabalar',
  sovgalar:   "Sovg'alar",
  moliya:     'Moliya',
  boshqarish: 'Boshqarish',
};

export default function DashboardPage() {
  const [activeNav, setActiveNav] = useState('asosiy');
  // active tab inside Boshqarish — persists even when sidebar closes
  const [activeTab, setActiveTab] = useState('kurslar');

  function renderContent() {
    switch (activeNav) {
      case 'asosiy':
        return <AsosiyContent />;
      case 'talabalar':
        return <OqituvchilarPage />;
      case 'boshqarish':
        return (
          <BoshqarishContent
            activeTab={activeTab}
            onTabClick={setActiveTab}
          />
        );
      default:
        return (
          <div className="flex flex-1 flex-col items-center justify-center p-8">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                <span className="text-3xl">🚧</span>
              </div>
              <h2 className="text-xl font-bold text-gray-700">{NAV_LABELS[activeNav]}</h2>
              <p className="mt-2 text-sm text-gray-400">Bu bo'lim tez orada qo'shiladi</p>
            </div>
          </div>
        );
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Global toast notifications */}
      <Toaster position="top-right" richColors closeButton />

      {/* Sidebar — handles sub-sidebar internally */}
      <Sidebar
        activeNav={activeNav}
        onNavClick={setActiveNav}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title={NAV_LABELS[activeNav] ?? ''} />
        <main className="flex flex-1 flex-col overflow-hidden">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
