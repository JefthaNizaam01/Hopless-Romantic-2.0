
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const conversationTopics = [
  {
    category: "Future Dreams",
    icon: "✨",
    topics: [
      "What does your ideal life look like in 10 years?",
      "Where do you see yourself living your happily ever after?",
      "What legacy do you want to leave behind?",
      "How do you envision growing old with someone?"
    ]
  },
  {
    category: "Love & Relationships",
    icon: "💕",
    topics: [
      "What does true love mean to you?",
      "How do you handle disagreements in relationships?",
      "What's your biggest fear about falling in love?",
      "How do you know when someone is 'the one'?"
    ]
  },
  {
    category: "Family & Children",
    icon: "👨‍👩‍👧‍👦",
    topics: [
      "Do you want children? How many?",
      "What kind of parent do you hope to be?",
      "How important is family in your life?",
      "What traditions would you want to start with your family?"
    ]
  },
  {
    category: "Values & Beliefs",
    icon: "🙏",
    topics: [
      "What are your core values in life?",
      "How do you handle stress and difficult times?",
      "What role does spirituality play in your life?",
      "What would you never compromise on in a relationship?"
    ]
  },
  {
    category: "Intimacy & Connection",
    icon: "🤝",
    topics: [
      "How do you build emotional intimacy?",
      "What makes you feel most connected to someone?",
      "How do you express vulnerability?",
      "What does trust mean to you in relationships?"
    ]
  },
  {
    category: "Deal Breakers",
    icon: "🚫",
    topics: [
      "What's your stance on cheating and infidelity?",
      "How do you handle jealousy?",
      "What behaviors are absolute deal breakers for you?",
      "How important is financial compatibility?"
    ]
  }
];

export const DeepConversations = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  const handleTopicSelect = (topic: string) => {
    setCurrentTopic(topic);
  };

  const handleStartConversation = () => {
    if (currentTopic) {
      toast({
        title: "Deep Conversation Started! 💬",
        description: "You've opened a meaningful dialogue. Take your time to share authentically.",
      });
    }
  };

  const toggleFavorite = (topic: string) => {
    setFavorites(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="romantic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Deep Conversations</CardTitle>
            <CardDescription className="text-lg">
              Meaningful topics to build genuine connections and understand each other's hearts
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-playfair">Conversation Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {conversationTopics.map((category) => (
                  <Button
                    key={category.category}
                    onClick={() => setSelectedCategory(category.category)}
                    variant={selectedCategory === category.category ? "default" : "outline"}
                    className={`w-full justify-start text-left h-auto p-4 ${
                      selectedCategory === category.category 
                        ? "romantic-gradient text-white" 
                        : ""
                    }`}
                  >
                    <span className="text-xl mr-3">{category.icon}</span>
                    <span>{category.category}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Topics */}
          <div className="lg:col-span-2">
            {selectedCategory ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-playfair flex items-center">
                    <span className="text-2xl mr-3">
                      {conversationTopics.find(c => c.category === selectedCategory)?.icon}
                    </span>
                    {selectedCategory}
                  </CardTitle>
                  <CardDescription>
                    Choose a topic to start a meaningful conversation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversationTopics
                    .find(c => c.category === selectedCategory)
                    ?.topics.map((topic, index) => (
                      <Card 
                        key={index} 
                        className={`cursor-pointer transition-all hover:romantic-glow ${
                          currentTopic === topic ? "ring-2 ring-primary" : ""
                        }`}
                        onClick={() => handleTopicSelect(topic)}
                      >
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <p className="text-lg font-medium flex-1">{topic}</p>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(topic);
                              }}
                              variant="ghost"
                              size="sm"
                              className="ml-2"
                            >
                              <Heart 
                                className={`w-5 h-5 ${
                                  favorites.includes(topic) 
                                    ? "fill-primary text-primary" 
                                    : "text-muted-foreground"
                                }`} 
                              />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-playfair mb-2">Select a Category</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation category to explore meaningful topics
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {currentTopic && (
          <Card className="romantic-glow">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Ready to Connect?</CardTitle>
              <CardDescription>
                You've selected: "{currentTopic}"
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-4">
              <Button onClick={handleStartConversation} className="romantic-gradient text-white">
                <Users className="w-5 h-5 mr-2" />
                Start Conversation
              </Button>
              <Button variant="outline">
                <Heart className="w-5 h-5 mr-2" />
                Save for Later
              </Button>
            </CardContent>
          </Card>
        )}

        {favorites.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Your Favorite Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {favorites.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="p-2 text-sm">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
