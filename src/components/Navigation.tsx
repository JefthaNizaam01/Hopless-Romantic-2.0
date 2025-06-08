
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, MessageCircle, Calendar, User, BookHeart, Coffee, Music, Mail, Sparkles } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t-2 border-primary/20 bg-background/95 backdrop-blur-sm md:hidden">
      <CardContent className="p-2">
        <div className="flex justify-around items-center">
          <Button
            onClick={() => onSectionChange('discovery')}
            variant={activeSection === 'discovery' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeSection === 'discovery' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Discover</span>
          </Button>

          <Button
            onClick={() => onSectionChange('matches')}
            variant={activeSection === 'matches' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeSection === 'matches' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </Button>

          <Button
            onClick={() => onSectionChange('messages')}
            variant={activeSection === 'messages' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeSection === 'messages' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Messages</span>
          </Button>

          <Button
            onClick={() => onSectionChange('events')}
            variant={activeSection === 'events' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeSection === 'events' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Events</span>
          </Button>

          <Button
            onClick={() => onSectionChange('profile')}
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 ${
              activeSection === 'profile' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const DesktopNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <Card className="hidden md:block w-64 h-full">
      <CardContent className="p-6">
        <div className="space-y-2">
          <Button
            onClick={() => onSectionChange('discovery')}
            variant={activeSection === 'discovery' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'discovery' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Heart className="w-5 h-5 mr-3" />
            Discover Love
          </Button>

          <Button
            onClick={() => onSectionChange('matches')}
            variant={activeSection === 'matches' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'matches' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            My Matches
          </Button>

          <Button
            onClick={() => onSectionChange('messages')}
            variant={activeSection === 'messages' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'messages' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Messages
          </Button>

          <Button
            onClick={() => onSectionChange('events')}
            variant={activeSection === 'events' ? 'default' : 'ghost'}
            className={`w-full justify-start ${
              activeSection === 'events' ? 'romantic-gradient text-white' : ''
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Romantic Events
          </Button>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-playfair font-semibold mb-2 text-sm text-muted-foreground">
              SPECIAL FEATURES
            </h3>
            
            <Button
              onClick={() => onSectionChange('quiz')}
              variant={activeSection === 'quiz' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'quiz' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <Heart className="w-5 h-5 mr-3" />
              Love Language Quiz
            </Button>

            <Button
              onClick={() => onSectionChange('conversations')}
              variant={activeSection === 'conversations' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'conversations' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Deep Conversations
            </Button>

            <Button
              onClick={() => onSectionChange('poetry')}
              variant={activeSection === 'poetry' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'poetry' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <BookHeart className="w-5 h-5 mr-3" />
              Poetry Duets
            </Button>

            <Button
              onClick={() => onSectionChange('connections')}
              variant={activeSection === 'connections' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'connections' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <Coffee className="w-5 h-5 mr-3" />
              Connection Meter
            </Button>

            <Button
              onClick={() => onSectionChange('secret-admirer')}
              variant={activeSection === 'secret-admirer' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'secret-admirer' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Secret Admirer Notes
            </Button>

            <Button
              onClick={() => onSectionChange('vibe-playlists')}
              variant={activeSection === 'vibe-playlists' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'vibe-playlists' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <Music className="w-5 h-5 mr-3" />
              VibePlaylists
            </Button>

            <Button
              onClick={() => onSectionChange('love-letters')}
              variant={activeSection === 'love-letters' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'love-letters' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <Mail className="w-5 h-5 mr-3" />
              Daily Love Letters
            </Button>
          </div>

          <div className="border-t pt-4 mt-4">
            <Button
              onClick={() => onSectionChange('profile')}
              variant={activeSection === 'profile' ? 'default' : 'ghost'}
              className={`w-full justify-start ${
                activeSection === 'profile' ? 'romantic-gradient text-white' : ''
              }`}
            >
              <User className="w-5 h-5 mr-3" />
              My Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
