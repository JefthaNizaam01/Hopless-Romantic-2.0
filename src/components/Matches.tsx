
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Coffee, Calendar, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Match {
  id: string;
  name: string;
  photo: string;
  age: number;
  level: 'loverboy' | 'lovergirl';
  matchDate: string;
  lastMessage?: string;
  lastMessageTime?: string;
  isOnline: boolean;
  connectionScore: number;
}

const sampleMatches: Match[] = [
  {
    id: "1",
    name: "Emma",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    age: 26,
    level: "lovergirl",
    matchDate: "2 hours ago",
    lastMessage: "I'd love to write a poem together! 💕",
    lastMessageTime: "5m ago",
    isOnline: true,
    connectionScore: 85
  },
  {
    id: "2",
    name: "James",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    age: 29,
    level: "loverboy",
    matchDate: "1 day ago",
    lastMessage: "How about that coffee date? ☕",
    lastMessageTime: "2h ago",
    isOnline: false,
    connectionScore: 72
  },
  {
    id: "3",
    name: "Sofia",
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
    age: 24,
    level: "lovergirl",
    matchDate: "3 days ago",
    lastMessage: "Your love language quiz result was so interesting!",
    lastMessageTime: "1d ago",
    isOnline: true,
    connectionScore: 91
  }
];

export const Matches = () => {
  const [matches] = useState(sampleMatches);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const { toast } = useToast();

  const handleStartChat = (match: Match) => {
    toast({
      title: "Opening chat! 💬",
      description: `Starting conversation with ${match.name}`,
    });
    setSelectedMatch(match);
  };

  const handleCoffeeDate = (match: Match) => {
    toast({
      title: "Coffee Date Requested! ☕",
      description: `You've asked ${match.name} for a coffee date!`,
    });
  };

  const handlePlanEvent = (match: Match) => {
    toast({
      title: "Event Planning! 🎉",
      description: `Planning a romantic event with ${match.name}`,
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="romantic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Your Heart-to-Heart Matches</CardTitle>
            <CardDescription className="text-lg">
              Beautiful souls who felt the same spark ✨
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {matches.map((match) => (
            <Card 
              key={match.id} 
              className="cursor-pointer hover:romantic-glow transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedMatch(match)}
            >
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img 
                    src={match.photo} 
                    alt={match.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                      {match.level === 'loverboy' ? '💙 Loverboy' : '💗 Lovergirl'}
                    </Badge>
                  </div>
                  {match.isOnline && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-xs font-medium">{match.connectionScore}% match</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-playfair font-semibold">
                      {match.name}, {match.age}
                    </h3>
                    <p className="text-sm text-muted-foreground">Matched {match.matchDate}</p>
                  </div>

                  {match.lastMessage && (
                    <div className="bg-secondary/50 rounded-lg p-3">
                      <p className="text-sm italic">"{match.lastMessage}"</p>
                      <p className="text-xs text-muted-foreground mt-1">{match.lastMessageTime}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartChat(match);
                      }}
                      size="sm" 
                      className="flex-1 romantic-gradient text-white"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCoffeeDate(match);
                      }}
                      size="sm" 
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <Coffee className="w-4 h-4" />
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlanEvent(match);
                      }}
                      size="sm" 
                      variant="outline"
                      className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                    >
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {matches.length === 0 && (
          <Card className="text-center p-8">
            <CardContent>
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-playfair mb-2">No matches yet</h3>
              <p className="text-muted-foreground">
                Keep swiping to find your hopeless romantic soulmate!
              </p>
            </CardContent>
          </Card>
        )}

        {/* Match Details Modal */}
        {selectedMatch && (
          <Card className="fixed inset-4 z-50 bg-background border-2 border-primary overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-playfair">
                    {selectedMatch.name}, {selectedMatch.age}
                  </CardTitle>
                  <CardDescription>
                    {selectedMatch.connectionScore}% match • Matched {selectedMatch.matchDate}
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => setSelectedMatch(null)}
                  variant="outline"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <img 
                src={selectedMatch.photo} 
                alt={selectedMatch.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => handleStartChat(selectedMatch)}
                  className="romantic-gradient text-white"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Start Chatting
                </Button>
                <Button 
                  onClick={() => handleCoffeeDate(selectedMatch)}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Coffee className="w-5 h-5 mr-2" />
                  Coffee Date
                </Button>
                <Button 
                  onClick={() => handlePlanEvent(selectedMatch)}
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Plan Event
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
