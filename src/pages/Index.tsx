import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, MessageCircle, BookHeart, Calendar, Coffee, Sparkles, Music, Mail, Star, Zap } from "lucide-react";
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
  const [userLevel, setUserLevel] = useState<'loverboy' | 'lovergirl' | null>('lovergirl');

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 gradient-primary opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full opacity-10 animate-float blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300 rounded-full opacity-10 animate-pulse-slow blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-5 animate-pulse-slow blur-3xl"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center max-w-4xl mx-auto animate-fade-in">
          {/* Hero Header */}
          <div className="mb-12">
            <div className="relative mb-8">
              <div className="absolute inset-0 gradient-primary rounded-full w-20 h-20 mx-auto opacity-20 animate-pulse-slow blur-xl"></div>
              <div className="relative gradient-primary rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-glow">
                <Heart className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold mb-6 text-gradient leading-tight">
              Hopeless Romantic
            </h1>
            
            <div className="relative">
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 mb-8 font-light leading-relaxed">
                Where deep love begins and meaningful connections flourish
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 gradient-primary rounded-full opacity-60"></div>
            </div>
          </div>

          {/* Level Selection */}
          {!userLevel && (
            <div className="mb-12 animate-slide-up">
              <Card className="card-premium max-w-2xl mx-auto">
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-3xl font-playfair text-gradient">Choose Your Romantic Path</CardTitle>
                  <CardDescription className="text-lg text-slate-600">
                    How would you like to be known in our romantic community?
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-6 justify-center pb-8">
                  <Button 
                    onClick={() => setUserLevel('loverboy')} 
                    className="btn-primary group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="text-2xl mr-3">💙</span>
                      I'm a Loverboy
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                  <Button 
                    onClick={() => setUserLevel('lovergirl')} 
                    className="btn-primary group relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      <span className="text-2xl mr-3">💗</span>
                      I'm a Lovergirl
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {userLevel && (
            <div className="mb-12 animate-scale-in">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-playfair mb-2 text-slate-700">
                  Welcome, beautiful {userLevel}!
                </h2>
                <div className="flex items-center justify-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
              </div>
              
              {/* Main Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <FeatureCard
                  icon={<Heart className="w-8 h-8" />}
                  title="Discover"
                  description="Find your soulmate"
                  gradient="from-red-400 to-pink-500"
                  onClick={() => setActiveSection('discovery')}
                />
                <FeatureCard
                  icon={<Users className="w-8 h-8" />}
                  title="Matches"
                  description="Your perfect matches"
                  gradient="from-purple-400 to-indigo-500"
                  onClick={() => setActiveSection('matches')}
                />
                <FeatureCard
                  icon={<MessageCircle className="w-8 h-8" />}
                  title="Messages"
                  description="Romantic conversations"
                  gradient="from-blue-400 to-cyan-500"
                  onClick={() => setActiveSection('messages')}
                />
                <FeatureCard
                  icon={<Calendar className="w-8 h-8" />}
                  title="Events"
                  description="Magical gatherings"
                  gradient="from-green-400 to-emerald-500"
                  onClick={() => setActiveSection('events')}
                />
              </div>

              {/* Special Features for Mobile */}
              <div className="md:hidden mb-8">
                <Card className="card-premium">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-playfair text-gradient flex items-center justify-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Special Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <FeatureCard
                        icon={<Heart className="w-6 h-6" />}
                        title="Love Quiz"
                        description="Discover your language"
                        gradient="from-red-400 to-pink-500"
                        onClick={() => setActiveSection('quiz')}
                        compact
                      />
                      <FeatureCard
                        icon={<MessageCircle className="w-6 h-6" />}
                        title="Deep Talks"
                        description="Meaningful conversations"
                        gradient="from-blue-400 to-purple-500"
                        onClick={() => setActiveSection('conversations')}
                        compact
                      />
                      <FeatureCard
                        icon={<BookHeart className="w-6 h-6" />}
                        title="Poetry"
                        description="Write together"
                        gradient="from-purple-400 to-pink-500"
                        onClick={() => setActiveSection('poetry')}
                        compact
                      />
                      <FeatureCard
                        icon={<Sparkles className="w-6 h-6" />}
                        title="Secret Notes"
                        description="Anonymous admirer"
                        gradient="from-indigo-400 to-purple-500"
                        onClick={() => setActiveSection('secret-admirer')}
                        compact
                      />
                    </div>
                    <Button 
                      onClick={() => setActiveSection('special')}
                      className="w-full btn-primary"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      View All Special Features
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Button 
                onClick={() => setActiveSection('discovery')}
                className="btn-primary text-xl px-12 py-4 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Start Finding Love
                  <Heart className="w-6 h-6 ml-3 group-hover:animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Button>
            </div>
          )}

          {/* Feature Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <ShowcaseCard
              icon={<Heart className="w-12 h-12" />}
              title="Heart-to-Heart"
              description="Our unique way to show deep interest - no superficial swipes"
              gradient="from-red-400 to-pink-500"
            />
            <ShowcaseCard
              icon={<Coffee className="w-12 h-12" />}
              title="Coffee Dates"
              description="Ask someone for coffee, not just a generic match"
              gradient="from-amber-400 to-orange-500"
            />
            <ShowcaseCard
              icon={<BookHeart className="w-12 h-12" />}
              title="Authentic Connections"
              description="Build real relationships through meaningful conversations"
              gradient="from-purple-400 to-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const FeatureCard = ({ 
    icon, 
    title, 
    description, 
    gradient, 
    onClick, 
    compact = false 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
    onClick: () => void;
    compact?: boolean;
  }) => (
    <Card 
      className={`card-premium hover-lift cursor-pointer group ${compact ? 'p-3' : 'p-4'}`} 
      onClick={onClick}
    >
      <CardContent className={`text-center ${compact ? 'p-3' : 'p-4'}`}>
        <div className={`bg-gradient-to-r ${gradient} rounded-2xl ${compact ? 'w-12 h-12 mb-3' : 'w-16 h-16 mb-4'} mx-auto flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
          {icon}
        </div>
        <h3 className={`font-playfair font-semibold mb-2 text-slate-700 ${compact ? 'text-sm' : 'text-base'}`}>
          {title}
        </h3>
        <p className={`text-slate-500 ${compact ? 'text-xs' : 'text-sm'}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );

  const ShowcaseCard = ({ 
    icon, 
    title, 
    description, 
    gradient 
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
    gradient: string;
  }) => (
    <Card className="card-premium hover-lift group">
      <CardContent className="text-center p-8">
        <div className={`bg-gradient-to-r ${gradient} rounded-3xl w-20 h-20 mx-auto mb-6 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        <h3 className="text-xl font-playfair font-semibold mb-3 text-slate-700">
          {title}
        </h3>
        <p className="text-slate-500 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
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
            <div className="sticky top-0 z-40 nav-glass border-b border-white/20 p-4 flex items-center justify-between">
              <h1 className="text-xl font-playfair font-bold text-gradient">
                Hopeless Romantic
              </h1>
              <Button 
                onClick={() => setActiveSection('home')} 
                className="btn-secondary md:hidden"
                size="sm"
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