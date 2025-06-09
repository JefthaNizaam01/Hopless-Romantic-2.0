
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MessageCircle, BookHeart, Calendar, Coffee, Sparkles, Music, Mail } from "lucide-react";
import { LoveLanguageQuiz } from "@/components/LoveLanguageQuiz";
import { ProfileCreation } from "@/components/ProfileCreation";
import { DeepConversations } from "@/components/DeepConversations";
import { PoetryDuets } from "@/components/PoetryDuets";
import { ConnectionMeter } from "@/components/ConnectionMeter";
import { Discovery } from "@/components/Discovery";
import { Matches } from "@/components/Matches";
import { Messages } from "@/components/Messages";
import { Events } from "@/components/Events";
import { SecretAdmirerNotes } from "@/components/SecretAdmirerNotes";
import { VibePlaylists } from "@/components/VibePlaylists";
import { DailyLoveLetters } from "@/components/DailyLoveLetters";
import { SpecialFeatures } from "@/components/SpecialFeatures";
import { Navigation, DesktopNavigation } from "@/components/Navigation";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [userLevel, setUserLevel] = useState<'loverboy' | 'lovergirl' | null>('lovergirl'); // Set default for demo

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'discovery':
        return <Discovery />;
      case 'matches':
        return <Matches />;
      case 'messages':
        return <Messages />;
      case 'events':
        return <Events />;
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
      case 'secret-admirer':
        return <SecretAdmirerNotes />;
      case 'vibe-playlists':
        return <VibePlaylists />;
      case 'love-letters':
        return <DailyLoveLetters />;
      case 'special':
        return <SpecialFeatures onSectionChange={setActiveSection} />;
      default:
        return <HeroSection />;
    }
  };

  const HeroSection = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-6">
      {/* Romantic background elements */}
      <div className="absolute inset-0 romantic-gradient opacity-10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-romantic-blush rounded-full opacity-20 animate-romantic-pulse"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent rounded-full opacity-30 animate-romantic-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <Heart className="w-16 h-16 text-primary mx-auto mb-4 heartbeat" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 romantic-gradient bg-clip-text text-transparent">
            Hopeless Romantic
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 font-inter">
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
            <h2 className="text-xl md:text-2xl font-playfair mb-6">
              Welcome, beautiful {userLevel}! ✨
            </h2>
            
            {/* Main Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <FeatureCard
                icon={<Heart className="w-6 h-6 md:w-8 md:h-8" />}
                title="Discover"
                description="Find your soulmate"
                onClick={() => setActiveSection('discovery')}
              />
              <FeatureCard
                icon={<Users className="w-6 h-6 md:w-8 md:h-8" />}
                title="Matches"
                description="Your perfect matches"
                onClick={() => setActiveSection('matches')}
              />
              <FeatureCard
                icon={<MessageCircle className="w-6 h-6 md:w-8 md:h-8" />}
                title="Messages"
                description="Romantic conversations"
                onClick={() => setActiveSection('messages')}
              />
              <FeatureCard
                icon={<Calendar className="w-6 h-6 md:w-8 md:h-8" />}
                title="Events"
                description="Magical gatherings"
                onClick={() => setActiveSection('events')}
              />
            </div>

            {/* Special Features for Mobile */}
            <div className="md:hidden mb-6">
              <Card className="romantic-glow border-primary/20">
                <CardHeader>
                  <CardTitle className="font-playfair text-lg">Special Features ✨</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <FeatureCard
                      icon={<Heart className="w-6 h-6" />}
                      title="Love Quiz"
                      description="Discover your language"
                      onClick={() => setActiveSection('quiz')}
                    />
                    <FeatureCard
                      icon={<MessageCircle className="w-6 h-6" />}
                      title="Deep Talks"
                      description="Meaningful conversations"
                      onClick={() => setActiveSection('conversations')}
                    />
                    <FeatureCard
                      icon={<BookHeart className="w-6 h-6" />}
                      title="Poetry"
                      description="Write together"
                      onClick={() => setActiveSection('poetry')}
                    />
                    <FeatureCard
                      icon={<Sparkles className="w-6 h-6" />}
                      title="Secret Notes"
                      description="Anonymous admirer"
                      onClick={() => setActiveSection('secret-admirer')}
                    />
                  </div>
                  <Button 
                    onClick={() => setActiveSection('special')}
                    className="w-full mt-4 romantic-gradient text-white"
                  >
                    View All Special Features
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Button 
              onClick={() => setActiveSection('discovery')}
              className="romantic-gradient text-white px-8 py-3 text-lg mb-8"
            >
              Start Finding Love 💕
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="text-center p-6 hover:romantic-glow transition-all duration-300">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-playfair font-semibold mb-2">Heart-to-Heart</h3>
            <p className="text-muted-foreground">Our unique way to show deep interest - no superficial swipes</p>
          </Card>
          
          <Card className="text-center p-6 hover:romantic-glow transition-all duration-300">
            <Coffee className="w-12 h-12 text-accent mx-auto mb-4" />
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
        <h3 className="font-playfair font-semibold mb-1 text-sm md:text-base">{title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <DesktopNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection} 
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {/* Header */}
          {activeSection !== 'home' && userLevel && (
            <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b p-4 flex items-center justify-between">
              <h1 className="text-xl font-playfair font-bold romantic-gradient bg-clip-text text-transparent">
                Hopeless Romantic
              </h1>
              <Button 
                onClick={() => setActiveSection('home')} 
                variant="outline"
                size="sm"
                className="md:hidden"
              >
                Home
              </Button>
            </div>
          )}

          {renderActiveSection()}
        </div>
      </div>

      {/* Mobile Navigation */}
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
    </div>
  );
};

export default Index;
