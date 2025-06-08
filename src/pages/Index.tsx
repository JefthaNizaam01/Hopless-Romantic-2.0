
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MessageCircle, BookHeart } from "lucide-react";
import { LoveLanguageQuiz } from "@/components/LoveLanguageQuiz";
import { ProfileCreation } from "@/components/ProfileCreation";
import { DeepConversations } from "@/components/DeepConversations";
import { PoetryDuets } from "@/components/PoetryDuets";
import { ConnectionMeter } from "@/components/ConnectionMeter";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userLevel, setUserLevel] = useState<'loverboy' | 'lovergirl' | null>(null);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'quiz':
        return <LoveLanguageQuiz />;
      case 'profile':
        return <ProfileCreation />;
      case 'conversations':
        return <DeepConversations />;
      case 'poetry':
        return <PoetryDuets />;
      case 'connections':
        return <ConnectionMeter />;
      default:
        return <HeroSection />;
    }
  };

  const HeroSection = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Romantic background elements */}
      <div className="absolute inset-0 romantic-gradient opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-romantic-blush rounded-full opacity-20 animate-romantic-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent rounded-full opacity-30 animate-romantic-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4 heartbeat" />
          <h1 className="text-6xl md:text-7xl font-playfair font-bold mb-6 romantic-gradient bg-clip-text text-transparent">
            Hopeless Romantic
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-inter">
            Where deep love begins and meaningful connections flourish
          </p>
        </div>

        {/* Level Selection */}
        {!userLevel && (
          <Card className="mb-8 romantic-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Romantic Path</CardTitle>
              <CardDescription>How would you like to be known in our romantic community?</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4 justify-center">
              <Button 
                onClick={() => setUserLevel('loverboy')} 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg"
              >
                I'm a Loverboy 💙
              </Button>
              <Button 
                onClick={() => setUserLevel('lovergirl')} 
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
              >
                I'm a Lovergirl 💗
              </Button>
            </CardContent>
          </Card>
        )}

        {userLevel && (
          <div className="mb-8">
            <h2 className="text-2xl font-playfair mb-6">
              Welcome, beautiful {userLevel}! ✨
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <FeatureCard
                icon={<Heart className="w-8 h-8" />}
                title="Love Languages"
                description="Discover your romantic language"
                onClick={() => setActiveSection('quiz')}
              />
              <FeatureCard
                icon={<Users className="w-8 h-8" />}
                title="Create Profile"
                description="Share your romantic story"
                onClick={() => setActiveSection('profile')}
              />
              <FeatureCard
                icon={<MessageCircle className="w-8 h-8" />}
                title="Deep Conversations"
                description="Meaningful heart-to-hearts"
                onClick={() => setActiveSection('conversations')}
              />
              <FeatureCard
                icon={<BookHeart className="w-8 h-8" />}
                title="Poetry Duets"
                description="Write love poems together"
                onClick={() => setActiveSection('poetry')}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6 hover:romantic-glow transition-all duration-300">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold mb-2">Heart-to-Heart</h3>
            <p className="text-muted-foreground">Our unique way to show deep interest - no superficial swipes</p>
          </Card>
          
          <Card className="text-center p-6 hover:romantic-glow transition-all duration-300">
            <Users className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold mb-2">Coffee Dates</h3>
            <p className="text-muted-foreground">Ask someone for coffee, not just a generic match</p>
          </Card>
          
          <Card className="text-center p-6 hover:romantic-glow transition-all duration-300">
            <BookHeart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold mb-2">Authentic Connections</h3>
            <p className="text-muted-foreground">Build real relationships through meaningful conversations</p>
          </Card>
        </div>
      </div>
    </div>
  );

  const FeatureCard = ({ icon, title, description, onClick }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
  }) => (
    <Card className="cursor-pointer hover:romantic-glow transition-all duration-300 hover:scale-105" onClick={onClick}>
      <CardContent className="p-4 text-center">
        <div className="text-primary mb-2">{icon}</div>
        <h3 className="font-playfair font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      {activeSection !== 'home' && (
        <div className="fixed top-4 left-4 z-50">
          <Button 
            onClick={() => setActiveSection('home')} 
            variant="outline"
            className="bg-background/80 backdrop-blur-sm"
          >
            ← Back to Home
          </Button>
        </div>
      )}

      {renderActiveSection()}
    </div>
  );
};

export default Index;
