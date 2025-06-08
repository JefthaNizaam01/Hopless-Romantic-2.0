
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Heart, Bookmark, BookmarkCheck, Send, Quote } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoveLetter {
  id: string;
  type: 'match' | 'literature' | 'daily';
  title: string;
  content: string;
  author?: string;
  fromMatch?: string;
  matchPhoto?: string;
  date: Date;
  isBookmarked: boolean;
  hasReplied?: boolean;
}

const sampleLetters: LoveLetter[] = [
  {
    id: "1",
    type: "match",
    title: "Good Morning, Beautiful",
    content: "Every morning I wake up thinking of your smile. You bring so much joy into my world that I sometimes wonder if I'm dreaming. Today, I want you to know that you're the first thought that crosses my mind and the reason my heart feels so full. Have the most wonderful day, my dear. 💕",
    fromMatch: "Emma",
    matchPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    date: new Date(),
    isBookmarked: false,
    hasReplied: false
  },
  {
    id: "2",
    type: "literature",
    title: "From Pride and Prejudice",
    content: "You have bewitched me, body and soul, and I love, I love, I love you. I never wish to be parted from you from this day on.",
    author: "Jane Austen",
    date: new Date(Date.now() - 86400000),
    isBookmarked: true
  },
  {
    id: "3",
    type: "daily",
    title: "Today's Romantic Thought",
    content: "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day. Make today count by showing love in the little things.",
    date: new Date(Date.now() - 172800000),
    isBookmarked: false
  }
];

export const DailyLoveLetters = () => {
  const [letters, setLetters] = useState(sampleLetters);
  const [selectedLetter, setSelectedLetter] = useState<LoveLetter | null>(letters[0]);
  const [replyText, setReplyText] = useState("");
  const { toast } = useToast();

  const toggleBookmark = (letterId: string) => {
    setLetters(prev => 
      prev.map(letter => 
        letter.id === letterId 
          ? { ...letter, isBookmarked: !letter.isBookmarked }
          : letter
      )
    );

    const letter = letters.find(l => l.id === letterId);
    if (letter) {
      toast({
        title: letter.isBookmarked ? "Bookmark Removed" : "Bookmarked! 💕",
        description: letter.isBookmarked 
          ? "Letter removed from bookmarks" 
          : "Letter saved to your collection",
      });
    }
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedLetter) return;

    setLetters(prev => 
      prev.map(letter => 
        letter.id === selectedLetter.id 
          ? { ...letter, hasReplied: true }
          : letter
      )
    );

    setSelectedLetter(prev => 
      prev ? { ...prev, hasReplied: true } : null
    );

    setReplyText("");

    toast({
      title: "Reply Sent! 💌",
      description: `Your love letter has been sent to ${selectedLetter.fromMatch}!`,
    });
  };

  const generateNewLetter = () => {
    const romanticQuotes = [
      {
        content: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
        author: "Maya Angelou"
      },
      {
        content: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
        author: "Lao Tzu"
      },
      {
        content: "The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.",
        author: "Nicholas Sparks"
      }
    ];

    const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];
    
    const newLetter: LoveLetter = {
      id: Date.now().toString(),
      type: "literature",
      title: "New Daily Inspiration",
      content: randomQuote.content,
      author: randomQuote.author,
      date: new Date(),
      isBookmarked: false
    };

    setLetters(prev => [newLetter, ...prev]);
    setSelectedLetter(newLetter);

    toast({
      title: "New Love Letter! 📜",
      description: "A fresh romantic inspiration has arrived!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-romantic-blush/10 p-4">
      <div className="max-w-5xl mx-auto">
        <Card className="romantic-glow border-primary/20 mb-6">
          <CardHeader className="text-center">
            <div className="w-16 h-16 romantic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-playfair">Daily Love Letters 💌</CardTitle>
            <CardDescription className="text-lg">
              Romantic letters, quotes, and messages to brighten your day
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Letters List */}
          <div className="lg:col-span-1">
            <Card className="border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-playfair text-lg">Your Letters</CardTitle>
                <Button 
                  onClick={generateNewLetter}
                  size="sm"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <Quote className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {letters.map((letter) => (
                  <Card 
                    key={letter.id}
                    className={`cursor-pointer transition-all duration-300 ${
                      selectedLetter?.id === letter.id 
                        ? 'ring-2 ring-primary romantic-glow' 
                        : 'hover:romantic-glow'
                    }`}
                    onClick={() => setSelectedLetter(letter)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {letter.type === 'match' && letter.matchPhoto && (
                            <img 
                              src={letter.matchPhoto} 
                              alt={letter.fromMatch}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          {letter.type === 'match' && <Heart className="w-4 h-4 text-primary" />}
                          {letter.type === 'literature' && <Quote className="w-4 h-4 text-accent" />}
                          {letter.type === 'daily' && <Mail className="w-4 h-4 text-secondary-foreground" />}
                        </div>
                        {letter.isBookmarked && (
                          <BookmarkCheck className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      
                      <h4 className="font-semibold text-sm mb-1">{letter.title}</h4>
                      
                      <div className="flex items-center gap-2 mb-2">
                        {letter.type === 'match' && (
                          <Badge variant="outline" className="text-xs border-primary text-primary">
                            From {letter.fromMatch}
                          </Badge>
                        )}
                        {letter.type === 'literature' && (
                          <Badge variant="outline" className="text-xs border-accent text-accent">
                            Literature
                          </Badge>
                        )}
                        {letter.type === 'daily' && (
                          <Badge variant="outline" className="text-xs">
                            Daily
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-xs text-muted-foreground">
                        {letter.date.toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Selected Letter */}
          <div className="lg:col-span-2">
            {selectedLetter ? (
              <Card className="border-primary/20 h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-playfair">{selectedLetter.title}</CardTitle>
                      <CardDescription>
                        {selectedLetter.type === 'match' && `From ${selectedLetter.fromMatch}`}
                        {selectedLetter.type === 'literature' && `By ${selectedLetter.author}`}
                        {selectedLetter.type === 'daily' && 'Daily Inspiration'}
                        {' • '}
                        {selectedLetter.date.toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={() => toggleBookmark(selectedLetter.id)}
                      size="sm"
                      variant="outline"
                      className={selectedLetter.isBookmarked 
                        ? "border-primary text-primary" 
                        : "border-muted-foreground text-muted-foreground"
                      }
                    >
                      {selectedLetter.isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed text-base italic">
                      "{selectedLetter.content}"
                    </p>
                    {selectedLetter.author && (
                      <p className="text-muted-foreground text-right mt-4">
                        — {selectedLetter.author}
                      </p>
                    )}
                  </div>

                  {/* Reply Section for Match Letters */}
                  {selectedLetter.type === 'match' && (
                    <div className="border-t pt-6">
                      <h4 className="font-playfair font-semibold mb-3">Write Back</h4>
                      {selectedLetter.hasReplied ? (
                        <Card className="bg-green-50 border-green-200">
                          <CardContent className="p-4 text-center">
                            <Heart className="w-8 h-8 text-green-500 mx-auto mb-2" />
                            <p className="text-green-700 font-medium">
                              You've already replied to this letter! 💕
                            </p>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="space-y-3">
                          <Textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write your romantic reply..."
                            className="min-h-24 border-primary/20"
                          />
                          <Button 
                            onClick={sendReply}
                            disabled={!replyText.trim()}
                            className="romantic-gradient text-white"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Send Love Letter Back
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-primary/20 h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-playfair mb-2">Select a Love Letter</h3>
                  <p className="text-muted-foreground">
                    Choose a letter to read your daily dose of romance
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
