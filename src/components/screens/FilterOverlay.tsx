import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';

interface FilterOverlayProps {
  onClose: () => void;
}

export function FilterOverlay({ onClose }: FilterOverlayProps) {
  const [noiseLevel, setNoiseLevel] = React.useState('any');
  const [amenities, setAmenities] = React.useState<string[]>(['wifi']);
  const [openNow, setOpenNow] = React.useState(true);

  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(a => a !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col animate-in slide-in-from-bottom duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>

      <div className="flex-1 p-6 space-y-8 overflow-y-auto">
        
        {/* Noise Level */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Noise Level</h3>
          <div className="flex flex-wrap gap-2">
            {['Silent', 'Quiet', 'Moderate', 'Social'].map((level) => (
              <button
                key={level}
                onClick={() => setNoiseLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                  noiseLevel === level
                    ? 'bg-blue-100 border-blue-200 text-blue-800'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </section>

        {/* Amenities */}
        <section>
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Amenities</h3>
          <div className="grid grid-cols-2 gap-3">
            {['Power Outlets', 'Whiteboards', 'Food Nearby', 'WiFi', 'Monitor', 'Standing Desk'].map((amenity) => (
              <div 
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                  amenities.includes(amenity)
                    ? 'border-blue-500 bg-blue-50/50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-4 h-4 rounded border mr-3 flex items-center justify-center ${
                  amenities.includes(amenity) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                }`}>
                  {amenities.includes(amenity) && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className={`text-sm ${amenities.includes(amenity) ? 'text-blue-900 font-medium' : 'text-gray-600'}`}>
                  {amenity}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Open Now Toggle */}
        <section className="flex items-center justify-between py-2">
          <div className="space-y-0.5">
            <h3 className="text-sm font-semibold text-gray-900">Show Open Now</h3>
            <p className="text-xs text-gray-500">Only show spots currently open</p>
          </div>
          <Switch checked={openNow} onCheckedChange={setOpenNow} />
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => {
            setNoiseLevel('any');
            setAmenities([]);
            setOpenNow(false);
          }}>
            Reset
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onClose}>
            Show 12 Spots
          </Button>
        </div>
      </div>
    </div>
  );
}
