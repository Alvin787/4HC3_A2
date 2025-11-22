import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function MapScreen() {
  // Mock pins with arbitrary positions on the static map image
  const pins = [
    { id: 1, top: '30%', left: '40%', label: 'Mills' },
    { id: 2, top: '45%', left: '20%', label: 'Thode' },
    { id: 3, top: '25%', left: '65%', label: 'HSL' },
    { id: 4, top: '55%', left: '50%', label: 'MUSC' },
    { id: 5, top: '35%', left: '75%', label: 'MDCL' },
    { id: 6, top: '60%', left: '80%', label: 'LR Wilson' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-100 relative overflow-hidden">
      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1592313571449-8064b237337f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwbWFwJTIwdG9wJTIwZG93bnxlbnwxfHx8fDE3NjM3Njc4NTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Campus Map"
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />

        {/* Pins */}
        {pins.map((pin) => (
          <div 
            key={pin.id}
            className="absolute flex flex-col items-center transform -translate-x-1/2 -translate-y-full cursor-pointer group"
            style={{ top: pin.top, left: pin.left }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-red-600 fill-red-100 drop-shadow-lg transition-transform group-hover:-translate-y-1" />
              <div className="w-2 h-2 bg-red-600 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 shadow-sm" />
            </div>
            <div className="bg-white px-2 py-1 rounded shadow-md mt-1 text-xs font-bold text-gray-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {pin.label}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="bg-white rounded-full shadow-lg p-3 flex items-center">
          <MapPin className="text-gray-400 w-5 h-5 ml-2 mr-3" />
          <input 
            type="text" 
            placeholder="Search campus map..." 
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
          <Button size="sm" className="rounded-full h-8 w-8 p-0 bg-blue-600 hover:bg-blue-700">
            <Navigation className="w-4 h-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-10">
        <Button variant="secondary" className="bg-white shadow-md rounded-full w-10 h-10 p-0 text-gray-700 hover:bg-gray-50">
          <span className="text-lg font-bold">+</span>
        </Button>
        <Button variant="secondary" className="bg-white shadow-md rounded-full w-10 h-10 p-0 text-gray-700 hover:bg-gray-50">
          <span className="text-lg font-bold">-</span>
        </Button>
      </div>
    </div>
  );
}
