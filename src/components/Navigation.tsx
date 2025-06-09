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
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="nav-glass border-t border-white/20">
        <div className="flex justify-around items-center py-2 px-4">
          <NavButton
            icon={<Heart className="w-5 h-5" />}
            label="Discover"
            isActive={activeSection === 'discovery'}
            onClick={() => onSectionChange('discovery')}
            gradient="from-red-400 to-pink-500"
          />

          <NavButton
            icon={<Users className="w-5 h-5" />}
            label="Matches"
            isActive={activeSection === 'matches'}
            onClick={() => onSectionChange('matches')}
            gradient="from-purple-400 to-indigo-500"
          />

          <NavButton
            icon={<MessageCircle className="w-5 h-5" />}
            label="Messages"
            isActive={activeSection === 'messages'}
            onClick={() => onSectionChange('messages')}
            gradient="from-blue-400 to-cyan-500"
          />

          <NavButton
            icon={<Sparkles className="w-5 h-5" />}
            label="Special"
            isActive={activeSection === 'special'}
            onClick={() => onSectionChange('special')}
            gradient="from-yellow-400 to-orange-500"
          />

          <NavButton
            icon={<User className="w-5 h-5" />}
            label="Profile"
            isActive={activeSection === 'profile'}
            onClick={() => onSectionChange('profile')}
            gradient="from-green-400 to-emerald-500"
          />
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  gradient 
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  gradient: string;
}) => (
  <Button
    onClick={onClick}
    variant="ghost"
    className={`flex flex-col gap-1 h-auto py-2 px-3 transition-all duration-300 ${
      isActive 
        ? 'text-white' 
        : 'text-slate-600 hover:text-slate-800'
    }`}
  >
    <div className={`relative ${isActive ? 'transform scale-110' : ''}`}>
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-60`}></div>
      )}
      <div className={`relative p-2 rounded-xl transition-all duration-300 ${
        isActive 
          ? `bg-gradient-to-r ${gradient} shadow-lg` 
          : 'hover:bg-white/50'
      }`}>
        {icon}
      </div>
    </div>
    <span className={`text-xs font-medium ${isActive ? 'text-slate-700' : ''}`}>
      {label}
    </span>
  </Button>
);

export const DesktopNavigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  return (
    <div className="hidden md:block w-80 h-full">
      <Card className="card-premium h-full rounded-none border-r border-white/20">
        <CardContent className="p-6 h-full overflow-y-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="gradient-primary rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-glow mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-playfair font-bold text-gradient">
              Hopeless Romantic
            </h2>
          </div>

          <div className="space-y-3">
            {/* Main Navigation */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
                Main
              </h3>
              <DesktopNavButton
                icon={<Heart className="w-5 h-5" />}
                label="Discover Love"
                isActive={activeSection === 'discovery'}
                onClick={() => onSectionChange('discovery')}
                gradient="from-red-400 to-pink-500"
              />

              <DesktopNavButton
                icon={<Users className="w-5 h-5" />}
                label="My Matches"
                isActive={activeSection === 'matches'}
                onClick={() => onSectionChange('matches')}
                gradient="from-purple-400 to-indigo-500"
              />

              <DesktopNavButton
                icon={<MessageCircle className="w-5 h-5" />}
                label="Messages"
                isActive={activeSection === 'messages'}
                onClick={() => onSectionChange('messages')}
                gradient="from-blue-400 to-cyan-500"
              />

              <DesktopNavButton
                icon={<Calendar className="w-5 h-5" />}
                label="Romantic Events"
                isActive={activeSection === 'events'}
                onClick={() => onSectionChange('events')}
                gradient="from-green-400 to-emerald-500"
              />
            </div>

            {/* Special Features */}
            <div className="border-t border-slate-200 pt-6">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3 px-3">
                Special Features
              </h3>
              
              <DesktopNavButton
                icon={<Heart className="w-5 h-5" />}
                label="Love Language Quiz"
                isActive={activeSection === 'quiz'}
                onClick={() => onSectionChange('quiz')}
                gradient="from-pink-400 to-rose-500"
              />

              <DesktopNavButton
                icon={<MessageCircle className="w-5 h-5" />}
                label="Deep Conversations"
                isActive={activeSection === 'conversations'}
                onClick={() => onSectionChange('conversations')}
                gradient="from-indigo-400 to-purple-500"
              />

              <DesktopNavButton
                icon={<BookHeart className="w-5 h-5" />}
                label="Poetry Duets"
                isActive={activeSection === 'poetry'}
                onClick={() => onSectionChange('poetry')}
                gradient="from-purple-400 to-pink-500"
              />

              <DesktopNavButton
                icon={<Coffee className="w-5 h-5" />}
                label="Connection Meter"
                isActive={activeSection === 'connections'}
                onClick={() => onSectionChange('connections')}
                gradient="from-amber-400 to-orange-500"
              />

              <DesktopNavButton
                icon={<Sparkles className="w-5 h-5" />}
                label="Secret Admirer Notes"
                isActive={activeSection === 'secret-admirer'}
                onClick={() => onSectionChange('secret-admirer')}
                gradient="from-violet-400 to-purple-500"
              />

              <DesktopNavButton
                icon={<Music className="w-5 h-5" />}
                label="VibePlaylists"
                isActive={activeSection === 'vibe-playlists'}
                onClick={() => onSectionChange('vibe-playlists')}
                gradient="from-emerald-400 to-teal-500"
              />

              <DesktopNavButton
                icon={<Mail className="w-5 h-5" />}
                label="Daily Love Letters"
                isActive={activeSection === 'love-letters'}
                onClick={() => onSectionChange('love-letters')}
                gradient="from-red-400 to-rose-500"
              />
            </div>

            {/* Profile */}
            <div className="border-t border-slate-200 pt-6">
              <DesktopNavButton
                icon={<User className="w-5 h-5" />}
                label="My Profile"
                isActive={activeSection === 'profile'}
                onClick={() => onSectionChange('profile')}
                gradient="from-slate-400 to-slate-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DesktopNavButton = ({ 
  icon, 
  label, 
  isActive, 
  onClick, 
  gradient 
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  gradient: string;
}) => (
  <Button
    onClick={onClick}
    variant="ghost"
    className={`w-full justify-start mb-2 h-12 px-4 transition-all duration-300 ${
      isActive 
        ? 'bg-gradient-to-r text-white shadow-lg hover:shadow-xl' 
        : 'text-slate-600 hover:text-slate-800 hover:bg-white/50'
    }`}
    style={isActive ? { background: `linear-gradient(135deg, var(--tw-gradient-stops))` } : {}}
  >
    <div className={`mr-3 transition-all duration-300 ${isActive ? 'transform scale-110' : ''}`}>
      {icon}
    </div>
    <span className="font-medium">{label}</span>
  </Button>
);