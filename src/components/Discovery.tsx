import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Coffee, MessageCircle, MapPin, Calendar, Star, Sparkles, BookOpen, Music } from "lucide-react";
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
  idealDate: string;
  relationshipGoal: string;
  favoritePoem: string;
  poetryStyle: string;
  communicationStyle: string;
  compatibility: number;
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
    whyHere: "Searching for my person - someone who wants to build a beautiful love story together",
    idealDate: "A cozy evening at a vintage bookstore, followed by a candlelit dinner and stargazing in the park",
    relationshipGoal: "Long-term relationship leading to marriage",
    favoritePoem: "How do I love thee? Let me count the ways...",
    poetryStyle: "Romantic sonnets and free verse",
    communicationStyle: "Through words and deep conversations",
    compatibility: 92
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
    whyHere: "Ready to find my forever person and shower them with all the love they deserve",
    idealDate: "A jazz concert followed by a midnight walk in the rain, ending with hot chocolate and deep conversation",
    relationshipGoal: "Serious relationship with potential for future",
    favoritePoem: "Shall I compare thee to a summer's day?",
    poetryStyle: "Classic sonnets and modern free verse",
    communicationStyle: "Through thoughtful actions and quality time",
    compatibility: 87
  }
];

const getLoveLanguageIcon = (loveLanguage: string) => {
  switch (loveLanguage) {
    case "Words of Affirmation": return "💬";
    case "Acts of Service": return "🤝";
    case "Receiving Gifts": return "🎁";
    case "Quality Time": return "⏰";
    case "Physical Touch": return "🤗";
    default: return "💕";
  }
};

const getCompatibilityColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-100";
  if (score >= 80) return "text-blue-600 bg-blue-100";
  if (score >= 70) return "text-yellow-600 bg-yellow-100";
  return "text-gray-600 bg-gray-100";
};

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
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="text-center p-8">
          <CardContent>
            <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-playfair mb-2">No more profiles</h3>
            <p className="text-muted-foreground">Check back later for more hopeless romantics!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-md mx-auto">
        <Card className="romantic-glow overflow-hidden">
          <div className="relative">
            <img 
              src={currentProfile.photo} 
              alt={currentProfile.name}
              className="w-full h-96 object-cover"
            />
            
            {/* Compatibility Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                {currentProfile.level === 'loverboy' ? '💙 Loverboy' : '💗 Lovergirl'}
              </Badge>
              <Badge className={`${getCompatibilityColor(currentProfile.compatibility)} font-bold`}>
                <Sparkles className="w-3 h-3 mr-1" />
                {currentProfile.compatibility}% Match
              </Badge>
            </div>
            
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{currentProfile.distance} miles</span>
            </div>
          </div>

          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-playfair font-bold">
                {currentProfile.name}, {currentProfile.age}
              </h2>
              <p className="text-muted-foreground italic">"{currentProfile.bio}"</p>
            </div>

            <div className="space-y-3">
              {/* Love Language */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Love Language
                </h4>
                <Badge variant="outline" className="border-primary text-primary">
                  {getLoveLanguageIcon(currentProfile.loveLanguage)} {currentProfile.loveLanguage}
                </Badge>
              </div>

              {/* Relationship Goal */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Looking for</h4>
                <p className="text-sm bg-rose-50 p-2 rounded-lg border border-rose-200">
                  {currentProfile.relationshipGoal}
                </p>
              </div>

              {/* Ideal Date */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Dream Date
                </h4>
                <p className="text-sm bg-blue-50 p-2 rounded-lg border border-blue-200">
                  {currentProfile.idealDate}
                </p>
              </div>

              {/* Why Here */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Why I'm here</h4>
                <p className="text-sm">{currentProfile.whyHere}</p>
              </div>

              {/* Romantic Preferences */}
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

              {/* Creative Side */}
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Favorite Book:
                  </span>
                  <span className="font-medium">{currentProfile.favoriteBook}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Favorite Movie:
                  </span>
                  <span className="font-medium">{currentProfile.favoriteMovie}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Music className="w-4 h-4" />
                    Love Song:
                  </span>
                  <span className="font-medium">{currentProfile.favoriteSong}</span>
                </div>
              </div>

              {/* Poetry Style */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Poetry Style</h4>
                <p className="text-sm bg-purple-50 p-2 rounded-lg border border-purple-200">
                  {currentProfile.poetryStyle}
                </p>
              </div>

              {/* Communication Style */}
              <div>
                <h4 className="font-semibold text-sm text-muted-foreground mb-1">Expresses Love Through</h4>
                <p className="text-sm bg-green-50 p-2 rounded-lg border border-green-200">
                  {currentProfile.communicationStyle}
                </p>
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
                className="w-16 h-16 rounded-full border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                <Coffee className="w-6 h-6" />
              </Button>

              <Button
                onClick={() => handleSwipe('right')}
                size="lg"
                className="w-16 h-16 rounded-full romantic-gradient text-white heartbeat"
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


