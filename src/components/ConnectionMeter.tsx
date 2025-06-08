
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, MessageCircle, BookHeart, Award } from "lucide-react";

interface Connection {
  id: string;
  name: string;
  photo: string;
  level: 'loverboy' | 'lovergirl';
  connectionScore: number;
  sharedInterests: string[];
  lastInteraction: string;
  badges: string[];
  conversationTopics: number;
  poemsWritten: number;
}

const sampleConnections: Connection[] = [
  {
    id: "1",
    name: "Emma",
    photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    level: "lovergirl",
    connectionScore: 85,
    sharedInterests: ["Sunset walks", "Poetry reading", "Coffee shop dates"],
    lastInteraction: "Wrote a poem together",
    badges: ["Deep Conversationalist", "Poetry Partner", "Hopeless Romantic"],
    conversationTopics: 12,
    poemsWritten: 3
  },
  {
    id: "2",
    name: "James",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    level: "loverboy",
    connectionScore: 72,
    sharedInterests: ["Stargazing", "Jazz music", "Handwritten letters"],
    lastInteraction: "Deep conversation about future dreams",
    badges: ["Thoughtful Writer", "Stargazer", "Jazz Lover"],
    conversationTopics: 8,
    poemsWritten: 1
  }
];

export const ConnectionMeter = () => {
  const [connections, setConnections] = useState<Connection[]>(sampleConnections);
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null);

  const getConnectionLevel = (score: number) => {
    if (score >= 90) return { level: "Soulmate Connection", color: "text-red-500", icon: "💕" };
    if (score >= 75) return { level: "Deep Connection", color: "text-pink-500", icon: "💖" };
    if (score >= 60) return { level: "Growing Bond", color: "text-purple-500", icon: "💜" };
    if (score >= 40) return { level: "Friendly Interest", color: "text-blue-500", icon: "💙" };
    return { level: "New Connection", color: "text-gray-500", icon: "🤍" };
  };

  const handleCoffeeDate = (connection: Connection) => {
    console.log(`Asking ${connection.name} for coffee! ☕`);
  };

  const handleHeartToHeart = (connection: Connection) => {
    console.log(`Sending Heart-to-Heart to ${connection.name}! 💝`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="romantic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Connection Meter</CardTitle>
            <CardDescription className="text-lg">
              Track your meaningful connections and see how your bonds grow stronger
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Connections List */}
          <div className="space-y-4">
            <h3 className="text-xl font-playfair">Your Connections</h3>
            {connections.map((connection) => {
              const levelInfo = getConnectionLevel(connection.connectionScore);
              return (
                <Card 
                  key={connection.id} 
                  className={`cursor-pointer transition-all hover:romantic-glow ${
                    selectedConnection?.id === connection.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedConnection(connection)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={connection.photo} 
                        alt={connection.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold">{connection.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {connection.level === 'loverboy' ? '💙 Loverboy' : '💗 Lovergirl'}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{levelInfo.icon}</span>
                          <span className={`font-medium ${levelInfo.color}`}>
                            {levelInfo.level}
                          </span>
                        </div>
                        
                        <Progress value={connection.connectionScore} className="mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {connection.lastInteraction}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Connection Details */}
          <div>
            {selectedConnection ? (
              <Card className="romantic-glow">
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair flex items-center gap-3">
                    <img 
                      src={selectedConnection.photo} 
                      alt={selectedConnection.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {selectedConnection.name}
                  </CardTitle>
                  <CardDescription>
                    Connection Score: {selectedConnection.connectionScore}%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <Progress value={selectedConnection.connectionScore} className="mb-2" />
                    <p className="text-sm text-center">
                      {getConnectionLevel(selectedConnection.connectionScore).level}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center">
                      <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedConnection.conversationTopics}</p>
                      <p className="text-sm text-muted-foreground">Deep Topics</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <BookHeart className="w-8 h-8 text-accent mx-auto mb-2" />
                      <p className="text-2xl font-bold">{selectedConnection.poemsWritten}</p>
                      <p className="text-sm text-muted-foreground">Poems Together</p>
                    </Card>
                  </div>

                  {/* Shared Interests */}
                  <div>
                    <h5 className="font-semibold mb-3">Shared Romantic Interests</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedConnection.sharedInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div>
                    <h5 className="font-semibold mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-romantic-gold" />
                      Connection Badges
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedConnection.badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="border-romantic-gold text-romantic-gold">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button 
                      onClick={() => handleCoffeeDate(selectedConnection)}
                      className="romantic-gradient text-white"
                    >
                      <Coffee className="w-4 h-4 mr-2" />
                      Ask for Coffee
                    </Button>
                    <Button 
                      onClick={() => handleHeartToHeart(selectedConnection)}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Heart-to-Heart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-playfair mb-2">Select a Connection</h3>
                  <p className="text-muted-foreground">
                    Choose someone from your connections to see your bond details
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Connection Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Building Stronger Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Deep Conversations</h4>
                <p className="text-sm text-muted-foreground">Engage in meaningful topics to strengthen your bond</p>
              </div>
              <div className="text-center p-4">
                <BookHeart className="w-8 h-8 text-accent mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Create Together</h4>
                <p className="text-sm text-muted-foreground">Write poems and share creative moments</p>
              </div>
              <div className="text-center p-4">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h4 className="font-semibold mb-1">Be Authentic</h4>
                <p className="text-sm text-muted-foreground">Share your true self and listen with your heart</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
