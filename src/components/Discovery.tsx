
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Coffee, MessageCircle, MapPin, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  name: string;
  age: number;
  photo: string;
  photos: string[];
  bio: string;
  distance: number;
  level: 'loverboy' | 'lovergirl';
  loveLanguage: string;
  favoriteMovie: string;
  favoriteBook: string;
  favoriteSong: string;
  preferences: string[];
  whyHere: string;
}

const sampleProfiles: Profile[] = [
  {
    id: "1",
    name: "Emma",
    age: 26,
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face"
    ],
    bio: "Looking for someone who believes in fairy tale endings and isn't afraid to write love letters. I cry during romantic movies and that's perfectly okay! ✨",
    distance: 2,
    level: "lovergirl",
    loveLanguage: "Words of Affirmation",
    favoriteMovie: "The Notebook",
    favoriteBook: "Pride and Prejudice",
    favoriteSong: "All of Me by John Legend",
    preferences: ["Sunset walks", "Poetry reading", "Coffee shop dates", "Stargazing"],
    whyHere: "Searching for my person - someone who wants to build a beautiful love story together"
  },
  {
    id: "2",
    name: "James",
    age: 29,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    photos: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face"
    ],
    bio: "Hopeless romantic who still opens doors and writes handwritten notes. Let's create our own love story, one chapter at a time 💕",
    distance: 5,
    level: "loverboy",
    loveLanguage: "Acts of Service",
    favoriteMovie: "Casablanca",
    favoriteBook: "The Time Traveler's Wife",
    favoriteSong: "At Last by Etta James",
    preferences: ["Jazz music", "Candlelit dinners", "Dancing in the rain", "Art galleries"],
    whyHere: "Ready to find my forever person and shower them with all the love they deserve"
  }
];

export const Discovery = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(sampleProfiles);
  const { toast } = useToast();

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      toast({
        title: "Heart-to-Heart Sent! 💕",
        description: `You've sent a Heart-to-Heart to ${currentProfile.name}!`,
      });
    } else {
      toast({
        title: "Passed",
        description: "Moving to the next romantic soul...",
      });
    }

    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      toast({
        title: "No more profiles",
        description: "Check back later for more hopeless romantics!",
      });
    }
  };

  const handleCoffeeDate = () => {
    toast({
      title: "Coffee Date Request Sent! ☕",
      description: `You've asked ${currentProfile.name} for a coffee date!`,
    });
  };

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <Card className="text-center p-8 shadow-lg">
          <CardContent>
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-foreground">No more profiles</h3>
            <p className="text-muted-foreground">Check back later for more hopeless romantics!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="max-w-md mx-auto">
        <Card className="shadow-xl border-border overflow-hidden">
          <div className="relative">
            <img 
              src={currentProfile.photo} 
              alt={currentProfile.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-foreground border-border">
                {currentProfile.level === 'loverboy' ? '💙 Loverboy' : '💗 Lovergirl'}
              </Badge>
            </div>
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1 border border-border">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{currentProfile.distance} miles</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-muted-foreground italic">"{currentProfile.bio}"</p>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Love Language</h4>
                <Badge variant="outline" className="border-primary text-primary">
                  {currentProfile.loveLanguage}
                </Badge>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Why I'm here</h4>
                <p className="text-sm text-foreground">{currentProfile.whyHere}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Romantic Preferences</h4>
                <div className="flex flex-wrap gap-1">
                  {currentProfile.preferences.slice(0, 3).map((pref, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {pref}
                    </Badge>
                  ))}
                  {currentProfile.preferences.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{currentProfile.preferences.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorite Movie:</span>
                  <span className="font-medium text-foreground">{currentProfile.favoriteMovie}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Favorite Book:</span>
                  <span className="font-medium text-foreground">{currentProfile.favoriteBook}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Love Song:</span>
                  <span className="font-medium text-foreground">{currentProfile.favoriteSong}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <Button
                onClick={() => handleSwipe('left')}
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full border-2 hover:border-destructive hover:text-destructive"
              >
                <X className="w-6 h-6" />
              </Button>

              <Button
                onClick={handleCoffeeDate}
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Coffee className="w-6 h-6" />
              </Button>

              <Button
                onClick={() => handleSwipe('right')}
                size="lg"
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Heart className="w-6 h-6" />
              </Button>
            </div>

            <p className="text-center text-xs text-muted-foreground mt-4">
              💕 Heart-to-Heart • ☕ Coffee Date • ✕ Pass
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
