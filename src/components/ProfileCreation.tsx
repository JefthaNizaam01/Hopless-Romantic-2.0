
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Upload, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const romanticPreferences = [
  "Sunset walks", "Handwritten letters", "Cozy cuddles", "Stargazing", "Poetry reading",
  "Candlelit dinners", "Dancing in the rain", "Vintage bookstores", "Art galleries", 
  "Coffee shop dates", "Beach picnics", "Mountain hikes", "Jazz music", "Slow dancing"
];

export const ProfileCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    loveLanguage: "",
    favoriteMovie: "",
    favoriteBook: "",
    favoriteSong: "",
    preferences: [] as string[],
    whyHere: ""
  });

  const { toast } = useToast();

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.age || !formData.bio) {
      toast({
        title: "Incomplete Profile",
        description: "Please fill in your name, age, and bio to continue.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Saved! 💕",
      description: "Your romantic profile has been created beautifully.",
    });
  };

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="max-w-4xl w-full space-y-6">
        <Card className="romantic-glow">
          <CardHeader>
            <CardTitle className="text-3xl font-playfair text-center">Create Your Romantic Profile</CardTitle>
            <CardDescription className="text-center text-lg">
              Let your authentic self shine through and attract your perfect match
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-lg">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your beautiful name"
                  className="text-lg p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-lg">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Your age"
                  className="text-lg p-3"
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label className="text-lg">Profile Photos</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Upload your most genuine photos</p>
                <Button variant="outline" className="mt-4">Choose Photos</Button>
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-lg">About You</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Share your story, dreams, and what makes your heart skip a beat..."
                className="min-h-[120px] text-lg p-3"
              />
            </div>

            {/* Why are you here? */}
            <div className="space-y-2">
              <Label htmlFor="whyHere" className="text-lg">Why are you here?</Label>
              <Textarea
                id="whyHere"
                value={formData.whyHere}
                onChange={(e) => setFormData(prev => ({ ...prev, whyHere: e.target.value }))}
                placeholder="Share your intentions and what you're looking for in love..."
                className="min-h-[100px] text-lg p-3"
              />
            </div>

            {/* Romantic Preferences */}
            <div className="space-y-4">
              <Label className="text-lg">Your Romantic Preferences</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {romanticPreferences.map((preference) => (
                  <Button
                    key={preference}
                    onClick={() => handlePreferenceToggle(preference)}
                    variant={formData.preferences.includes(preference) ? "default" : "outline"}
                    className={`text-sm h-auto p-3 ${
                      formData.preferences.includes(preference) 
                        ? "romantic-gradient text-white" 
                        : ""
                    }`}
                  >
                    {preference}
                  </Button>
                ))}
              </div>
            </div>

            {/* Favorites */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="movie" className="text-lg">Favorite Romantic Movie</Label>
                <Input
                  id="movie"
                  value={formData.favoriteMovie}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteMovie: e.target.value }))}
                  placeholder="e.g., The Notebook"
                  className="p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="book" className="text-lg">Favorite Love Story</Label>
                <Input
                  id="book"
                  value={formData.favoriteBook}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteBook: e.target.value }))}
                  placeholder="e.g., Pride and Prejudice"
                  className="p-3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="song" className="text-lg">Song That Makes You Think of Love</Label>
                <Input
                  id="song"
                  value={formData.favoriteSong}
                  onChange={(e) => setFormData(prev => ({ ...prev, favoriteSong: e.target.value }))}
                  placeholder="e.g., All of Me by John Legend"
                  className="p-3"
                />
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button onClick={handleSave} className="romantic-gradient text-white px-8 py-3 text-lg">
                <Heart className="w-5 h-5 mr-2" />
                Save My Romantic Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
