import React from 'react';
import { HomeScreen } from './components/screens/HomeScreen';
import { FilterOverlay } from './components/screens/FilterOverlay';
import { PlaceDetailScreen } from './components/screens/PlaceDetailScreen';
import { WriteReviewScreen } from './components/screens/WriteReviewScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { MapScreen } from './components/screens/MapScreen';
import { BottomNav } from './components/BottomNav';
import { STUDY_SPOTS, StudySpot } from './lib/mockData';
import { toast } from 'sonner';

type Screen = 'home' | 'filter' | 'detail' | 'review' | 'profile' | 'map';

type FilterState = {
  noiseLevel: 'any' | 'Silent' | 'Quiet' | 'Moderate' | 'Social';
  amenities: string[];
  openNow: boolean;
};

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState<Screen>('home');
  const [selectedPlaceId, setSelectedPlaceId] = React.useState<string>('');
  const [detailParent, setDetailParent] = React.useState<Screen>('home');
  const [spots, setSpots] = React.useState<StudySpot[]>(() => 
    STUDY_SPOTS.map((spot) => ({ ...spot, isFavorite: false, checkedIn: false }))
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const [filters, setFilters] = React.useState<FilterState>({
    noiseLevel: 'any',
    amenities: [],
    openNow: false
  });

  const navigateTo = (screen: Screen, placeId?: string) => {
    if (placeId) {
      setSelectedPlaceId(placeId);
    }
    if (screen === 'detail' && currentScreen !== 'review') {
      setDetailParent(currentScreen);
    }
    if (screen !== currentScreen) {
      setCurrentScreen(screen);
    }
  };

  const handleBack = () => {
    if (currentScreen === 'review') {
      setCurrentScreen('detail');
      return;
    }
    if (currentScreen === 'detail') {
      setCurrentScreen(detailParent || 'home');
      return;
    }
    if (currentScreen === 'filter') {
      setCurrentScreen('home');
      return;
    }
  };

  const toggleFavorite = (placeId: string) => {
    setSpots((prev) => prev.map((spot) => 
      spot.id === placeId ? { ...spot, isFavorite: !spot.isFavorite } : spot
    ));
  };

  const handleCheckIn = (placeId: string) => {
    setSpots((prev) => prev.map((spot) => 
      spot.id === placeId ? { ...spot, checkedIn: true, lastCheckIn: 'Just now' } : spot
    ));
    toast.success('Checked in!');
  };

  const handleReviewSubmit = (rating: number, text: string) => {
    if (!selectedPlaceId) return;
    const newReviewId = `r-${Date.now()}`;
    setSpots((prev) => prev.map((spot) => 
      spot.id === selectedPlaceId 
        ? { 
            ...spot, 
            reviews: [
              { id: newReviewId, user: 'You', rating, text, date: 'Just now' },
              ...spot.reviews
            ] 
          }
        : spot
    ));
    setCurrentScreen('detail');
  };

  const filteredSpots = React.useMemo(() => {
    const lowerSearch = searchTerm.trim().toLowerCase();
    return spots.filter((spot) => {
      const matchesCategory = activeCategory === 'All' || spot.category === activeCategory;
      const matchesSearch = 
        lowerSearch === '' || 
        spot.name.toLowerCase().includes(lowerSearch) || 
        spot.description.toLowerCase().includes(lowerSearch);

      const crowdMap = {
        Silent: 'Quiet',
        Quiet: 'Quiet',
        Moderate: 'Moderate',
        Social: 'Busy'
      } as const;
      const matchesNoise = filters.noiseLevel === 'any' 
        ? true 
        : crowdMap[filters.noiseLevel] === spot.crowdStatus;

      const matchesAmenities = filters.amenities.length === 0 
        ? true 
        : filters.amenities.every((amenity) => 
            spot.amenities.map((a) => a.toLowerCase()).includes(amenity.toLowerCase())
          );

      return matchesCategory && matchesSearch && matchesNoise && matchesAmenities;
    });
  }, [spots, activeCategory, filters, searchTerm]);

  const activeSpot = spots.find((s) => s.id === selectedPlaceId) || spots[0];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white h-[100dvh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          
          {currentScreen === 'home' && (
            <HomeScreen 
              spots={filteredSpots}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onNavigate={navigateTo}
              onOpenFilters={() => navigateTo('filter')}
            />
          )}
          
          {currentScreen === 'profile' && (
            <ProfileScreen 
              onNavigate={navigateTo} 
              favorites={spots.filter((spot) => spot.isFavorite)}
              recent={spots.filter((spot) => spot.checkedIn)}
              myReviewsCount={spots.reduce((count, spot) => 
                count + spot.reviews.filter((review) => review.user === 'You').length
              , 0)}
            />
          )}

          {currentScreen === 'map' && (
            <MapScreen />
          )}

          {currentScreen === 'detail' && (
            <PlaceDetailScreen 
              spot={activeSpot} 
              onBack={handleBack}
              onReview={() => navigateTo('review')}
              onToggleFavorite={() => toggleFavorite(activeSpot.id)}
              onCheckIn={() => handleCheckIn(activeSpot.id)}
            />
          )}

          {currentScreen === 'review' && (
            <WriteReviewScreen 
              onBack={handleBack}
              onSubmit={handleReviewSubmit}
            />
          )}

          {/* Filter Overlay - Rendered on top of Home if needed, or just as a screen */}
          {currentScreen === 'filter' && (
            <FilterOverlay 
              onClose={handleBack} 
              filters={filters}
              onApply={(nextFilters) => {
                setFilters(nextFilters);
                setCurrentScreen('home');
              }}
              activeCategory={activeCategory}
              searchTerm={searchTerm}
              spots={spots}
            />
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
