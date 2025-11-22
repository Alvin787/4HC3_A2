import React from 'react';
import { ArrowLeft, CheckCircle2, Heart, MapPin, Users, Star, Share2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BarChart, Bar, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { StudySpot } from '../../lib/mockData';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface PlaceDetailScreenProps {
  spot: StudySpot;
  onBack: () => void;
  onReview: () => void;
  onToggleFavorite: () => void;
  onCheckIn: () => void;
}

export function PlaceDetailScreen({ spot, onBack, onReview, onToggleFavorite, onCheckIn }: PlaceDetailScreenProps) {

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-md rounded border border-gray-100 text-xs">
          <p className="font-medium">{label}</p>
          <p className="text-blue-600">{payload[0].value}% Full</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-white overflow-y-auto">
      {/* Hero Image & Header */}
      <div className="relative h-64 w-full">
        <ImageWithFallback 
          src={spot.image} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 left-4 text-white bg-black/20 hover:bg-black/40 rounded-full"
          onClick={onBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="absolute top-4 right-4 flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white bg-black/20 hover:bg-black/40 rounded-full"
          >
            <Share2 className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className={`bg-black/20 hover:bg-black/40 rounded-full ${spot.isFavorite ? 'text-red-500' : 'text-white'}`}
            onClick={onToggleFavorite}
          >
            <Heart className={`h-5 w-5 ${spot.isFavorite ? 'fill-current' : ''}`} />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <Badge className="mb-2 bg-blue-500 hover:bg-blue-600 border-none text-white">
            {spot.category}
          </Badge>
          <h1 className="text-2xl font-bold leading-tight mb-1">{spot.name}</h1>
          <div className="flex items-center text-sm text-gray-200">
            <MapPin className="w-4 h-4 mr-1" />
            {spot.distance} away
            <span className="mx-2">•</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            {spot.rating} ({spot.reviews.length} reviews)
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 gap-2">
            <MapPin className="w-4 h-4" />
            Directions
          </Button>
          <Button 
            variant="outline" 
            className={`flex-1 gap-2 border-blue-200 ${spot.checkedIn ? 'text-green-700 bg-green-50 hover:bg-green-50 border-green-200' : 'text-blue-700 hover:bg-blue-50'}`}
            onClick={() => {
              if (!spot.checkedIn) onCheckIn();
            }}
          >
            {spot.checkedIn ? <CheckCircle2 className="w-4 h-4" /> : <Users className="w-4 h-4" />}
            {spot.checkedIn ? 'Checked In' : 'Check In'}
          </Button>
        </div>
      </div>

      {/* Live Occupancy */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Live Occupancy</h2>
          <Badge variant="outline" className={`
            ${spot.crowdStatus === 'Busy' ? 'text-red-600 border-red-200 bg-red-50' : 
              spot.crowdStatus === 'Moderate' ? 'text-yellow-600 border-yellow-200 bg-yellow-50' : 
              'text-green-600 border-green-200 bg-green-50'}
          `}>
            Currently {spot.crowdStatus}
          </Badge>
        </div>
        
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spot.occupancyData}>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#9CA3AF'}} 
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{fill: '#F3F4F6'}} />
              <Bar dataKey="level" radius={[4, 4, 0, 0]}>
                {spot.occupancyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.level > 75 ? '#EF4444' : entry.level > 40 ? '#F59E0B' : '#10B981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* About */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 mb-2">About</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {spot.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {spot.amenities.map(amenity => (
            <div key={amenity} className="flex items-center px-3 py-1.5 bg-gray-50 rounded-full text-xs font-medium text-gray-600">
              {amenity}
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="p-5 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Reviews</h2>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 h-auto p-0" onClick={onReview}>
            Write a Review
          </Button>
        </div>

        <div className="space-y-4">
          {spot.reviews.length > 0 ? spot.reviews.map(review => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{review.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.user}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          )) : (
            <div className="text-center py-8 text-gray-500">
              <p>No reviews yet. Be the first!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
