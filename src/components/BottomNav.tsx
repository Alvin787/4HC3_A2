import React from 'react';
import { Home, User, Map } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="bg-white border-t border-gray-200 pb-6 pt-3 px-12 flex justify-between items-center sticky bottom-0 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <button 
        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        onClick={() => onTabChange('home')}
      >
        <Home className="w-6 h-6" strokeWidth={activeTab === 'home' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Discover</span>
      </button>
      
      <button 
        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'map' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        onClick={() => onTabChange('map')}
      >
        <Map className="w-6 h-6" strokeWidth={activeTab === 'map' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Map</span>
      </button>

      <button 
        className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
        onClick={() => onTabChange('profile')}
      >
        <User className="w-6 h-6" strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
        <span className="text-[10px] font-medium">Profile</span>
      </button>
    </div>
  );
}
