
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Upload, User } from "lucide-react";
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
      title: "Profile Saved Successfully",
      description: "Your profile has been created and saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="professional-shadow-lg professional-border">
          <CardHeader className="text-center border-b bg-white">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold text-foreground">Create Your Profile</CardTitle>
            <CardDescription className="text-muted-foreground">
              Complete your profile information to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 bg-white space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="professional-focus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-sm font-medium text-foreground">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    placeholder="Enter your age"
                    className="professional-focus"
                  />
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Profile Photo</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Upload your profile photo</p>
                <Button variant="outline" className="professional-focus">Choose File</Button>
              </div>
            </div>

            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">About You</h3>
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-foreground">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  className="min-h-[120px] professional-focus"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whyHere" className="text-sm font-medium text-foreground">Why are you here?</Label>
                <Textarea
                  id="whyHere"
                  value={formData.whyHere}
                  onChange={(e) => setFormData(prev => ({ ...prev, whyHere: e.target.value }))}
                  placeholder="Share your intentions and what you're looking for..."
                  className="min-h-[100px] professional-focus"
                />
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Interests & Preferences</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {romanticPreferences.map((preference) => (
                  <Button
                    key={preference}
                    onClick={() => handlePreferenceToggle(preference)}
                    variant={formData.preferences.includes(preference) ? "default" : "outline"}
                    size="sm"
                    className={`text-sm h-auto p-3 text-left justify-start professional-focus ${
                      formData.preferences.includes(preference) 
                        ? "professional-gradient text-white border-primary" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {preference}
                  </Button>
                ))}
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground border-b pb-2">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="movie" className="text-sm font-medium text-foreground">Favorite Movie</Label>
                  <Input
                    id="movie"
                    value={formData.favoriteMovie}
                    onChange={(e) => setFormData(prev => ({ ...prev, favoriteMovie: e.target.value }))}
                    placeholder="e.g., The Notebook"
                    className="professional-focus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="book" className="text-sm font-medium text-foreground">Favorite Book</Label>
                  <Input
                    id="book"
                    value={formData.favoriteBook}
                    onChange={(e) => setFormData(prev => ({ ...prev, favoriteBook: e.target.value }))}
                    placeholder="e.g., Pride and Prejudice"
                    className="professional-focus"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="song" className="text-sm font-medium text-foreground">Favorite Song</Label>
                  <Input
                    id="song"
                    value={formData.favoriteSong}
                    onChange={(e) => setFormData(prev => ({ ...prev, favoriteSong: e.target.value }))}
                    placeholder="e.g., All of Me by John Legend"
                    className="professional-focus"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8 border-t">
              <Button onClick={handleSave} className="professional-gradient text-white px-8 py-3 professional-focus">
                <Heart className="w-5 h-5 mr-2" />
                Save Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
