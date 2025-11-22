import React from 'react';
import { Settings, LogOut, MapPin, Star, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { STUDY_SPOTS } from '../../lib/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface ProfileScreenProps {
  onNavigate: (screen: string, placeId?: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  // Mock favorites logic - just take first 2
  const favorites = STUDY_SPOTS.slice(0, 2);
  const recent = STUDY_SPOTS.slice(1, 3);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="bg-white p-6 pb-8 text-center border-b border-gray-100">
        <div className="flex justify-end mb-2">
          <Button variant="ghost" size="icon" className="text-gray-400">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4 ring-4 ring-blue-50">
            <AvatarImage src="https://images.unsplash.com/photo-1679031216929-93f8d28e0f29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRlJTIwY2F0JTIwZmFjZXxlbnwxfHx8fDE3NjM2OTMzMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <h1 className="text-xl font-bold text-gray-900">Jessica Smith</h1>
          <p className="text-sm text-gray-500">Computer Science • Senior</p>
          
          <div className="flex gap-8 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">12</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Favorites</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">45</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Check-ins</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-blue-600">8</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">Reviews</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <Tabs defaultValue="favorites" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-white p-1 rounded-xl border border-gray-100">
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">My Favorites</TabsTrigger>
            <TabsTrigger value="recent" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 rounded-lg">Recently Visited</TabsTrigger>
          </TabsList>
          
          <TabsContent value="favorites" className="space-y-3">
            {favorites.map(spot => (
              <Card 
                key={spot.id} 
                className="flex p-3 gap-3 cursor-pointer hover:bg-gray-50 border-none shadow-sm"
                onClick={() => onNavigate('detail', spot.id)}
              >
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={spot.image} alt={spot.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-gray-900 text-sm">{spot.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    {spot.rating}
                    <span className="mx-1">•</span>
                    {spot.category}
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="recent" className="space-y-3">
            {recent.map(spot => (
              <Card 
                key={spot.id} 
                className="flex p-3 gap-3 cursor-pointer hover:bg-gray-50 border-none shadow-sm"
                onClick={() => onNavigate('detail', spot.id)}
              >
                <div className="h-16 w-16 rounded-lg overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={spot.image} alt={spot.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-gray-900 text-sm">{spot.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    Visited 2 days ago
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
