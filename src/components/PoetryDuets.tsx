
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookHeart, Users, Heart, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const poetryPrompts = [
  "Under starlit skies, we dance...",
  "Your eyes are like...",
  "In the garden of my heart...",
  "When morning light touches your face...",
  "Love is a whisper that...",
  "Together we are...",
  "In your embrace, I find...",
  "Our story begins with..."
];

interface PoemLine {
  id: string;
  text: string;
  author: string;
  timestamp: Date;
}

export const PoetryDuets = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [currentLine, setCurrentLine] = useState<string>("");
  const [poem, setPoem] = useState<PoemLine[]>([]);
  const [isMyTurn, setIsMyTurn] = useState<boolean>(true);
  const [partnerName, setPartnerName] = useState<string>("Your Poetry Partner");
  const { toast } = useToast();

  const addLine = () => {
    if (!currentLine.trim()) return;

    const newLine: PoemLine = {
      id: Date.now().toString(),
      text: currentLine.trim(),
      author: isMyTurn ? "You" : partnerName,
      timestamp: new Date()
    };

    setPoem(prev => [...prev, newLine]);
    setCurrentLine("");
    setIsMyTurn(!isMyTurn);

    // Simulate partner response after a delay
    if (isMyTurn) {
      setTimeout(() => {
        const partnerResponses = [
          "And in that moment, time stands still...",
          "Your heart beats in rhythm with mine...",
          "Like poetry written in the stars...",
          "A love story painted in whispered words...",
          "Where dreams and reality intertwine...",
          "In the silence between our souls..."
        ];
        
        const randomResponse = partnerResponses[Math.floor(Math.random() * partnerResponses.length)];
        const partnerLine: PoemLine = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          author: partnerName,
          timestamp: new Date()
        };
        
        setPoem(prev => [...prev, partnerLine]);
        setIsMyTurn(true);
      }, 2000);
    }

    toast({
      title: "Beautiful line added! 📝",
      description: "Your poetry is taking shape together.",
    });
  };

  const startNewPoem = (prompt: string) => {
    setSelectedPrompt(prompt);
    setPoem([{
      id: "prompt",
      text: prompt,
      author: "Prompt",
      timestamp: new Date()
    }]);
    setIsMyTurn(true);
  };

  const savePoem = () => {
    if (poem.length > 1) {
      toast({
        title: "Poem Saved! 💕",
        description: "Your collaborative masterpiece has been saved to your collection.",
      });
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="romantic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Poetry Duets</CardTitle>
            <CardDescription className="text-lg">
              Create beautiful poems together, line by line, heart to heart
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Poetry Prompts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair flex items-center">
                <BookHeart className="w-6 h-6 mr-2 text-primary" />
                Poetry Prompts
              </CardTitle>
              <CardDescription>
                Choose a romantic prompt to begin your collaborative poem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {poetryPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  onClick={() => startNewPoem(prompt)}
                  variant="outline"
                  className="w-full text-left h-auto p-4 hover:romantic-glow transition-all"
                >
                  <span className="italic text-primary">"{prompt}"</span>
                </Button>
              ))}
              
              <div className="pt-4 border-t">
                <Label htmlFor="custom-prompt">Or create your own prompt:</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="custom-prompt"
                    placeholder="Write your own romantic prompt..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => {
                      const input = document.getElementById('custom-prompt') as HTMLInputElement;
                      if (input?.value) {
                        startNewPoem(input.value);
                        input.value = '';
                      }
                    }}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Poetry Workspace */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-playfair flex items-center">
                <Users className="w-6 h-6 mr-2 text-accent" />
                Your Poem Together
              </CardTitle>
              {selectedPrompt && (
                <CardDescription>
                  Writing together: "{selectedPrompt}"
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {poem.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <BookHeart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Select a prompt to start writing your poem together</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {poem.map((line, index) => (
                      <div
                        key={line.id}
                        className={`p-3 rounded-lg ${
                          line.author === "You" 
                            ? "bg-primary/10 ml-4" 
                            : line.author === "Prompt"
                            ? "bg-secondary italic text-center"
                            : "bg-accent/10 mr-4"
                        }`}
                      >
                        <p className="text-lg">{line.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {line.author !== "Prompt" && `— ${line.author}`}
                        </p>
                      </div>
                    ))}
                  </div>

                  {selectedPrompt && (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={currentLine}
                          onChange={(e) => setCurrentLine(e.target.value)}
                          placeholder={isMyTurn ? "Add your line..." : "Waiting for your partner..."}
                          disabled={!isMyTurn}
                          onKeyPress={(e) => e.key === 'Enter' && addLine()}
                          className="flex-1"
                        />
                        <Button 
                          onClick={addLine} 
                          disabled={!isMyTurn || !currentLine.trim()}
                          className="romantic-gradient text-white"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      {!isMyTurn && (
                        <p className="text-sm text-muted-foreground text-center">
                          {partnerName} is writing their line... ✍️
                        </p>
                      )}

                      <div className="flex gap-2 justify-center pt-4">
                        <Button onClick={savePoem} variant="outline">
                          <Heart className="w-4 h-4 mr-2" />
                          Save Poem
                        </Button>
                        <Button onClick={() => {
                          setPoem([]);
                          setSelectedPrompt("");
                          setCurrentLine("");
                        }} variant="outline">
                          Start New Poem
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Poetry Collection */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-playfair">Your Poetry Collection</CardTitle>
            <CardDescription>
              Beautiful poems you've created together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <BookHeart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your saved poems will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
