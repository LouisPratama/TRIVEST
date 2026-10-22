import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { ASSET_IMAGES } from './data/mockData';
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
import { CustomerServiceWidget } from './components/CustomerServiceWidget';
import { VirtualFit360 } from './components/VirtualFit360';

const AppContent: React.FC = () => {
  const { activeTab, hasSession, setActiveTab } = useApp();

  if (activeTab === 'auth') {
    return <RegistrationPage />;
  }

  if (!hasSession) {
    return <LandingPage publicMode />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#26332D] font-['Nunito']">
      {/* 3-zone Header with Quick Role Switcher */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {(activeTab === 'landing' || activeTab === 'business-info') && <LandingPage />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'ai-studio' && <AiStudioView />}
        {activeTab === 'virtual-fit' && (
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            <VirtualFit360 onProceedToTailor={() => setActiveTab('tailors')} />
          </div>
        )}
        {activeTab === 'reverse-market' && <ReverseMarketView />}
        {activeTab === 'tailors' && <TailorDirectoryView />}
        {activeTab === 'orders' && <OrdersLogisticsView />}
      </main>

      {/* Overlays */}
      <AuthModal />
      <NotificationToast />
      <CustomerServiceWidget />
    </div>
  );
};

export default function App() {
  const handleImageError = (event: React.SyntheticEvent<HTMLDivElement>) => {
    const image = event.target;
    if (!(image instanceof HTMLImageElement) || image.dataset.fallbackApplied) return;

    image.dataset.fallbackApplied = 'true';
    const isSmallImage = image.getBoundingClientRect().width < 72;
    const description = `${image.alt} ${image.getAttribute('src') || ''}`.toLowerCase();
    const fallbackImage = /cargo|flanel|utility|vest/.test(description)
      ? ASSET_IMAGES.cargoVest
      : /tailor|penjahit|atelier|workshop/.test(description)
        ? ASSET_IMAGES.artisanWorkshop
        : /bunny|kelinci|logo/.test(description) || isSmallImage
          ? ASSET_IMAGES.bunnyHero
          : ASSET_IMAGES.denimJacket;

    image.src = fallbackImage;
  };

  return (
    <AppProvider>
      <div onErrorCapture={handleImageError}>
        <AppContent />
      </div>
    </AppProvider>
  );
}
