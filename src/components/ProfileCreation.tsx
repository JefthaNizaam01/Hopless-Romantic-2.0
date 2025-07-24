import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Upload, Star, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const romanticPreferences = [
  "Sunset walks", "Handwritten letters", "Cozy cuddles", "Stargazing", "Poetry reading",
  "Candlelit dinners", "Dancing in the rain", "Vintage bookstores", "Art galleries", 
  "Coffee shop dates", "Beach picnics", "Mountain hikes", "Jazz music", "Slow dancing"
];

const loveLanguageQuestions = [
  {
    id: 1,
    question: "When I'm feeling down, I appreciate when my partner...",
    options: [
      { text: "Gives me a hug and tells me everything will be okay", value: "touch" },
      { text: "Writes me a sweet note or sends an encouraging text", value: "words" },
      { text: "Does something practical to help me feel better", value: "acts" },
      { text: "Spends quality time with me, just being together", value: "time" },
      { text: "Surprises me with a small gift or treat", value: "gifts" }
    ]
  },
  {
    id: 2,
    question: "I feel most loved when my partner...",
    options: [
      { text: "Tells me specific things they love about me", value: "words" },
      { text: "Remembers important dates and celebrates them", value: "gifts" },
      { text: "Helps me with tasks or chores without being asked", value: "acts" },
      { text: "Plans special activities for just the two of us", value: "time" },
      { text: "Holds my hand or gives me physical affection", value: "touch" }
    ]
  },
  {
    id: 3,
    question: "In a relationship, I value...",
    options: [
      { text: "Deep conversations and meaningful discussions", value: "words" },
      { text: "Thoughtful gestures and acts of service", value: "acts" },
      { text: "Physical closeness and affectionate touch", value: "touch" },
      { text: "Undivided attention and shared experiences", value: "time" },
      { text: "Symbolic gifts that show they were thinking of me", value: "gifts" }
    ]
  },
  {
    id: 4,
    question: "When I want to show someone I care, I usually...",
    options: [
      { text: "Tell them directly how much they mean to me", value: "words" },
      { text: "Do something helpful or thoughtful for them", value: "acts" },
      { text: "Give them a meaningful gift or surprise", value: "gifts" },
      { text: "Spend quality time together, fully present", value: "time" },
      { text: "Show physical affection and closeness", value: "touch" }
    ]
  },
  {
    id: 5,
    question: "My ideal way to spend a romantic evening is...",
    options: [
      { text: "Having a deep conversation over dinner", value: "words" },
      { text: "Cooking a meal together and sharing the experience", value: "time" },
      { text: "Receiving a thoughtful gift or surprise", value: "gifts" },
      { text: "Cuddling and being physically close", value: "touch" },
      { text: "Having my partner take care of all the details", value: "acts" }
    ]
  }
];

const relationshipGoals = [
  "Long-term relationship leading to marriage",
  "Serious relationship with potential for future",
  "Casual dating with possibility of more",
  "Friendship that could develop into romance",
  "Open to whatever develops naturally"
];

export const ProfileCreation = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loveLanguageAnswers, setLoveLanguageAnswers] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bio: "",
    loveLanguage: "",
    favoriteMovie: "",
    favoriteBook: "",
    favoriteSong: "",
    preferences: [] as string[],
    whyHere: "",
    idealDate: "",
    relationshipGoal: "",
    favoritePoem: "",
    poetryStyle: "",
    communicationStyle: ""
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

  const handleLoveLanguageAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = [...loveLanguageAnswers];
    newAnswers[questionIndex] = optionIndex;
    setLoveLanguageAnswers(newAnswers);
  };

  const calculateLoveLanguage = () => {
    const scores = { words: 0, acts: 0, gifts: 0, time: 0, touch: 0 };
    loveLanguageAnswers.forEach((answer, index) => {
      const question = loveLanguageQuestions[index];
      const selectedOption = question.options[answer];
      if (selectedOption) {
        scores[selectedOption.value as keyof typeof scores]++;
      }
    });
    
    const primary = Object.entries(scores).reduce((a, b) => scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b)[0];
    return primary;
  };

  const nextStep = () => {
    if (currentStep === 2 && loveLanguageAnswers.length < 5) {
      toast({
        title: "Complete the Quiz",
        description: "Please answer all love language questions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2) {
      const loveLanguage = calculateLoveLanguage();
      setFormData(prev => ({ ...prev, loveLanguage }));
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair mb-2">Step 1: Basic Information</h2>
              <p className="text-muted-foreground">Let's start with the essentials</p>
            </div>
            
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

            <div className="space-y-2">
              <Label className="text-lg">Profile Photos</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Upload your most genuine photos</p>
                <Button variant="outline" className="mt-4">Choose Photos</Button>
              </div>
            </div>

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
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair mb-2">Step 2: Love Language Quiz</h2>
              <p className="text-muted-foreground">Discover how you give and receive love</p>
            </div>
            
            {loveLanguageQuestions.map((question, questionIndex) => (
              <div key={question.id} className="space-y-4 p-6 border border-pink-200 rounded-xl">
                <h3 className="text-lg font-semibold text-rose-700">
                  Question {question.id}: {question.question}
                </h3>
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      onClick={() => handleLoveLanguageAnswer(questionIndex, optionIndex)}
                      variant={loveLanguageAnswers[questionIndex] === optionIndex ? "default" : "outline"}
                      className={`w-full text-left justify-start h-auto p-4 ${
                        loveLanguageAnswers[questionIndex] === optionIndex 
                          ? "romantic-gradient text-white" 
                          : "hover:bg-rose-50"
                      }`}
                    >
                      {loveLanguageAnswers[questionIndex] === optionIndex && (
                        <CheckCircle className="w-5 h-5 mr-3" />
                      )}
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair mb-2">Step 3: Romantic Preferences</h2>
              <p className="text-muted-foreground">Tell us about your ideal romantic experiences</p>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="idealDate" className="text-lg">Describe Your Ideal Date</Label>
              <Textarea
                id="idealDate"
                value={formData.idealDate}
                onChange={(e) => setFormData(prev => ({ ...prev, idealDate: e.target.value }))}
                placeholder="Paint a picture of your perfect romantic date..."
                className="min-h-[100px] text-lg p-3"
              />
            </div>

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

            <div className="space-y-4">
              <Label className="text-lg">What are you looking for?</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {relationshipGoals.map((goal) => (
                  <Button
                    key={goal}
                    onClick={() => setFormData(prev => ({ ...prev, relationshipGoal: goal }))}
                    variant={formData.relationshipGoal === goal ? "default" : "outline"}
                    className={`text-sm h-auto p-3 text-left justify-start ${
                      formData.relationshipGoal === goal 
                        ? "romantic-gradient text-white" 
                        : ""
                    }`}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-playfair mb-2">Step 4: Creative Expression</h2>
              <p className="text-muted-foreground">Share your artistic and creative side</p>
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="favoritePoem" className="text-lg">Favorite Poem or Quote About Love</Label>
              <Textarea
                id="favoritePoem"
                value={formData.favoritePoem}
                onChange={(e) => setFormData(prev => ({ ...prev, favoritePoem: e.target.value }))}
                placeholder="Share a poem or quote that speaks to your heart..."
                className="min-h-[100px] text-lg p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="poetryStyle" className="text-lg">If you were to write poetry, what style appeals to you?</Label>
              <Input
                id="poetryStyle"
                value={formData.poetryStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, poetryStyle: e.target.value }))}
                placeholder="e.g., Romantic sonnets, free verse, haiku..."
                className="p-3"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="communicationStyle" className="text-lg">How do you prefer to express your feelings?</Label>
              <Input
                id="communicationStyle"
                value={formData.communicationStyle}
                onChange={(e) => setFormData(prev => ({ ...prev, communicationStyle: e.target.value }))}
                placeholder="e.g., Through words, actions, gifts, quality time, or physical touch..."
                className="p-3"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
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
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
              <div 
                className="romantic-gradient h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Step {currentStep} of 4
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStep()}

            <div className="flex justify-between pt-6">
              <Button 
                onClick={prevStep} 
                variant="outline" 
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              
              {currentStep < 4 ? (
                <Button 
                  onClick={nextStep} 
                  className="romantic-gradient text-white px-6 py-2 flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSave} 
                  className="romantic-gradient text-white px-8 py-3 text-lg flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Save My Romantic Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
