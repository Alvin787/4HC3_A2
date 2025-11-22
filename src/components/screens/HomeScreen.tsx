import React from 'react';
import { Search, Star, MapPin, Users } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { STUDY_SPOTS, StudySpot } from '../../lib/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface HomeScreenProps {
  onNavigate: (screen: string, placeId?: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const categories = ['All', 'Libraries', 'Cafes', 'Outdoors', 'Study Halls', 'Lounges'];
  const [activeCategory, setActiveCategory] = React.useState('All');

  const filteredSpots = activeCategory === 'All' 
    ? STUDY_SPOTS 
    : STUDY_SPOTS.filter(spot => spot.category === activeCategory);

  const getCrowdColor = (status: string) => {
    switch (status) {
      case 'Quiet': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Busy': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header Section */}
      <div className="bg-white p-4 pb-2 sticky top-0 z-10 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">McStudy</h1>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Find a Spot..." 
            className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500 rounded-full" 
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-1 top-1 h-8 w-8 text-gray-500"
            onClick={() => onNavigate('filter')}
          >
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3C2 2.44772 2.44772 2 3 2H12C12.5523 2 13 2.44772 13 3V4.5C13 4.63261 12.9473 4.75979 12.8536 4.85355L8.85355 8.85355C8.75979 8.94732 8.70711 9.0745 8.70711 9.20711V12.5C8.70711 12.7761 8.48325 13 8.20711 13H6.79289C6.51675 13 6.29289 12.7761 6.29289 12.5V9.20711C6.29289 9.0745 6.24021 8.94732 6.14645 8.85355L2.14645 4.85355C2.05268 4.75979 2 4.63261 2 4.5V3Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Button>
        </div>

        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-2 pb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`rounded-full px-6 ${
                  activeCategory === category 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-blue-600'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>

      {/* List Section */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Popular Study Spots</h2>
        {filteredSpots.map((spot) => (
          <Card 
            key={spot.id} 
            className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border-gray-100"
            onClick={() => onNavigate('detail', spot.id)}
          >
            <div className="flex flex-row h-32">
              <div className="w-1/3 relative">
                <ImageWithFallback
                  src={spot.image}
                  alt={spot.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{spot.name}</h3>
                    <Badge variant="secondary" className={`text-xs px-1.5 py-0 ${getCrowdColor(spot.crowdStatus)}`}>
                      {spot.crowdStatus}
                    </Badge>
                  </div>
                  <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500">
                    <span className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current mr-0.5" />
                      <span className="text-gray-700 font-medium">{spot.rating}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <MapPin className="w-3 h-3 mr-0.5" />
                      {spot.distance}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {spot.amenities.slice(0, 2).map(amenity => (
                    <span key={amenity} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {spot.amenities.length > 2 && (
                    <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      +{spot.amenities.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
