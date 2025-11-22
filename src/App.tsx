import React from 'react';
import { HomeScreen } from './components/screens/HomeScreen';
import { FilterOverlay } from './components/screens/FilterOverlay';
import { PlaceDetailScreen } from './components/screens/PlaceDetailScreen';
import { WriteReviewScreen } from './components/screens/WriteReviewScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MapScreen } from './components/screens/MapScreen';
import { BottomNav } from './components/BottomNav';

type Screen = 'home' | 'filter' | 'detail' | 'review' | 'profile' | 'map';

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = React.useState<Screen>('home');
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<string>('');

  const navigateTo = (screen: Screen, placeId?: string) => {
    if (screen !== currentScreen) {
      setPreviousScreen(currentScreen);
      setCurrentScreen(screen);
    }
    if (placeId) {
      setSelectedPlaceId(placeId);
    }
  };

  const handleBack = () => {
    // If we are in review, go back to detail
    if (currentScreen === 'review') {
      setCurrentScreen('detail');
      return;
    }
    // If we are in detail, go back to home or profile (wherever we came from)
    if (currentScreen === 'detail') {
      // Default to home if history is lost or it was filter
      if (previousScreen === 'filter') {
        setCurrentScreen('home');
      } else {
        setCurrentScreen(previousScreen);
      }
      return;
    }
    // If filter, go back to home
    if (currentScreen === 'filter') {
      setCurrentScreen('home');
      return;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          
          {currentScreen === 'home' && (
            <HomeScreen onNavigate={navigateTo} />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileScreen onNavigate={navigateTo} />
          )}

          {currentScreen === 'map' && (
            <MapScreen />
          )}

          {currentScreen === 'detail' && (
            <PlaceDetailScreen 
              placeId={selectedPlaceId} 
              onBack={handleBack}
              onReview={() => navigateTo('review')}
            />
          )}

          {currentScreen === 'review' && (
            <WriteReviewScreen 
              onBack={handleBack}
              onSubmit={() => {
                // Simulate submit delay then go back
                setTimeout(() => handleBack(), 1000);
              }}
            />
          )}

          {/* Filter Overlay - Rendered on top of Home if needed, or just as a screen */}
          {currentScreen === 'filter' && (
            <FilterOverlay onClose={handleBack} />
          )}
          
        </div>

        {/* Bottom Navigation - Only show on Home, Profile, and Map */}
        {(currentScreen === 'home' || currentScreen === 'profile' || currentScreen === 'map') && (
          <BottomNav 
            activeTab={currentScreen} 
            onTabChange={(tab) => navigateTo(tab as Screen)} 
          />
        )}
        
      </div>
    </div>
  );
}
