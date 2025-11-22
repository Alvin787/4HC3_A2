import React from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface WriteReviewScreenProps {
  onBack: () => void;
  onSubmit: (rating: number, text: string) => void;
}

export function WriteReviewScreen({ onBack, onSubmit }: WriteReviewScreenProps) {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState('');

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (reviewText.trim().length < 5) {
      toast.error("Tell us a bit more about your experience");
      return;
    }
    toast.success("Review submitted successfully!");
    onSubmit(rating, reviewText.trim());
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-4 border-b border-gray-100">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5 text-gray-600" />
        </Button>
        <h1 className="text-lg font-bold text-gray-900">Write a Review</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-col items-center mb-8">
          <p className="text-gray-500 mb-4 text-sm">How was your study session?</p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                className="focus:outline-none transition-transform hover:scale-110"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star 
                  className={`w-10 h-10 ${
                    star <= (hoverRating || rating) 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-200 fill-gray-50'
                  }`} 
                />
              </button>
            ))}
          </div>
          <p className="mt-2 font-medium text-blue-600">
            {rating === 1 ? 'Poor' : 
             rating === 2 ? 'Fair' : 
             rating === 3 ? 'Good' : 
             rating === 4 ? 'Very Good' : 
             rating === 5 ? 'Excellent' : 'Select a rating'}
          </p>
        </div>

        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <Label htmlFor="review">Your Review</Label>
            <Textarea 
              id="review" 
              placeholder="Share your experience about the noise level, wifi speed, or available amenities..."
              className="min-h-[150px] resize-none p-4 text-base bg-gray-50 border-gray-200 focus:bg-white"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
        </div>

        <Button 
          size="lg" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
}
