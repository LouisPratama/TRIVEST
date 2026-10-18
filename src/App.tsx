import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { ExploreView } from './components/ExploreView';
import { AiStudioView } from './components/AiStudioView';
import { ReverseMarketView } from './components/ReverseMarketView';
import { TailorDirectoryView } from './components/TailorDirectoryView';
import { OrdersLogisticsView } from './components/OrdersLogisticsView';
import { AuthModal } from './components/AuthModal';
import { NotificationToast } from './components/NotificationToast';
import { RegistrationPage } from './components/RegistrationPage';

const AppContent: React.FC = () => {
  const { activeTab, hasSession } = useApp();

  if (!hasSession) {
    return <RegistrationPage />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#46534D] font-['Nunito']">
      {/* 3-zone Header with Quick Role Switcher */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'landing' && <LandingPage />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'ai-studio' && <AiStudioView />}
        {activeTab === 'reverse-market' && <ReverseMarketView />}
        {activeTab === 'tailors' && <TailorDirectoryView />}
        {activeTab === 'orders' && <OrdersLogisticsView />}
      </main>

      {/* Overlays */}
      <AuthModal />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
