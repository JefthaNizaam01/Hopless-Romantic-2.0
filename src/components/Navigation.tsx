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
    <Card className="fixed bottom-0 left-0 right-0 z-50 rounded-none border-t professional-border bg-white md:hidden">
      <CardContent className="p-3">
        <div className="flex justify-around items-center">
          <Button
            onClick={() => onSectionChange('discovery')}
            variant={activeSection === 'discovery' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 px-3 professional-focus ${
              activeSection === 'discovery' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-xs">Discover</span>
          </Button>

          <Button
            onClick={() => onSectionChange('matches')}
            variant={activeSection === 'matches' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 px-3 professional-focus ${
              activeSection === 'matches' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </Button>

          <Button
            onClick={() => onSectionChange('messages')}
            variant={activeSection === 'messages' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 px-3 professional-focus ${
              activeSection === 'messages' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Messages</span>
          </Button>

          <Button
            onClick={() => onSectionChange('special')}
            variant={activeSection === 'special' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 px-3 professional-focus ${
              activeSection === 'special' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-xs">Special</span>
          </Button>

          <Button
            onClick={() => onSectionChange('profile')}
            variant={activeSection === 'profile' ? 'default' : 'ghost'}
            size="sm"
            className={`flex flex-col gap-1 h-auto py-2 px-3 professional-focus ${
              activeSection === 'profile' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground'
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
    <Card className="hidden md:block w-64 h-full professional-shadow professional-border">
      <CardContent className="p-6">
        <div className="space-y-1">
          <Button
            onClick={() => onSectionChange('discovery')}
            variant={activeSection === 'discovery' ? 'default' : 'ghost'}
            className={`w-full justify-start professional-focus ${
              activeSection === 'discovery' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
            }`}
          >
            <Heart className="w-5 h-5 mr-3" />
            Discover Love
          </Button>

          <Button
            onClick={() => onSectionChange('matches')}
            variant={activeSection === 'matches' ? 'default' : 'ghost'}
            className={`w-full justify-start professional-focus ${
              activeSection === 'matches' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            My Matches
          </Button>

          <Button
            onClick={() => onSectionChange('messages')}
            variant={activeSection === 'messages' ? 'default' : 'ghost'}
            className={`w-full justify-start professional-focus ${
              activeSection === 'messages' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-5 h-5 mr-3" />
            Messages
          </Button>

          <Button
            onClick={() => onSectionChange('events')}
            variant={activeSection === 'events' ? 'default' : 'ghost'}
            className={`w-full justify-start professional-focus ${
              activeSection === 'events' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Romantic Events
          </Button>

          <div className="border-t pt-4 mt-4">
            <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
              Special Features
            </h3>
            
            <Button
              onClick={() => onSectionChange('quiz')}
              variant={activeSection === 'quiz' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'quiz' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <Heart className="w-5 h-5 mr-3" />
              Love Language Quiz
            </Button>

            <Button
              onClick={() => onSectionChange('conversations')}
              variant={activeSection === 'conversations' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'conversations' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-5 h-5 mr-3" />
              Deep Conversations
            </Button>

            <Button
              onClick={() => onSectionChange('poetry')}
              variant={activeSection === 'poetry' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'poetry' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <BookHeart className="w-5 h-5 mr-3" />
              Poetry Duets
            </Button>

            <Button
              onClick={() => onSectionChange('connections')}
              variant={activeSection === 'connections' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'connections' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <Coffee className="w-5 h-5 mr-3" />
              Connection Meter
            </Button>

            <Button
              onClick={() => onSectionChange('secret-admirer')}
              variant={activeSection === 'secret-admirer' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'secret-admirer' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-5 h-5 mr-3" />
              Secret Admirer Notes
            </Button>

            <Button
              onClick={() => onSectionChange('vibe-playlists')}
              variant={activeSection === 'vibe-playlists' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'vibe-playlists' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
              }`}
            >
              <Music className="w-5 h-5 mr-3" />
              VibePlaylists
            </Button>

            <Button
              onClick={() => onSectionChange('love-letters')}
              variant={activeSection === 'love-letters' ? 'default' : 'ghost'}
              className={`w-full justify-start professional-focus ${
                activeSection === 'love-letters' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
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
              className={`w-full justify-start professional-focus ${
                activeSection === 'profile' ? 'professional-gradient text-white' : 'text-muted-foreground hover:text-foreground hover:bg-gray-50'
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
