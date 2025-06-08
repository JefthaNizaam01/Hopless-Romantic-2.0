
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageCircle, BookHeart, Coffee, Sparkles, Music, Mail, User } from "lucide-react";

interface SpecialFeaturesProps {
  onSectionChange: (section: string) => void;
}

export const SpecialFeatures = ({ onSectionChange }: SpecialFeaturesProps) => {
  const features = [
    {
      id: 'quiz',
      title: 'Love Language Quiz',
      description: 'Discover your love language',
      icon: <Heart className="w-8 h-8" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'conversations',
      title: 'Deep Conversations',
      description: 'Meaningful connection starters',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      id: 'poetry',
      title: 'Poetry Duets',
      description: 'Write poems together',
      icon: <BookHeart className="w-8 h-8" />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'connections',
      title: 'Connection Meter',
      description: 'Measure your compatibility',
      icon: <Coffee className="w-8 h-8" />,
      color: 'from-amber-500 to-orange-500'
    },
    {
      id: 'secret-admirer',
      title: 'Secret Admirer Notes 🌹',
      description: 'Send anonymous love notes',
      icon: <Sparkles className="w-8 h-8" />,
      color: 'from-violet-500 to-purple-500'
    },
    {
      id: 'vibe-playlists',
      title: 'VibePlaylists 🎶',
      description: 'Create music connections',
      icon: <Music className="w-8 h-8" />,
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'love-letters',
      title: 'Daily Love Letters 💌',
      description: 'Romantic daily inspiration',
      icon: <Mail className="w-8 h-8" />,
      color: 'from-red-500 to-rose-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-romantic-blush/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="romantic-glow border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 romantic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-playfair">Special Features ✨</CardTitle>
            <CardDescription className="text-lg">
              Discover unique ways to connect and find love
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              className="cursor-pointer hover:romantic-glow transition-all duration-300 hover:scale-105 border-primary/20"
              onClick={() => onSectionChange(feature.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {feature.icon}
                </div>
                <h3 className="font-playfair font-semibold mb-2 text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Romantic Quote */}
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardContent className="p-6 text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <blockquote className="text-lg font-playfair italic mb-4">
              "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage."
            </blockquote>
            <p className="text-muted-foreground">— Lao Tzu</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
