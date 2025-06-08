
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Send, Eye, EyeOff, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SecretNote {
  id: string;
  message: string;
  fromUser: string;
  toUser: string;
  isRevealed: boolean;
  timestamp: Date;
  userPhoto: string;
}

const sampleNotes: SecretNote[] = [
  {
    id: "1",
    message: "Your smile lights up my world like a thousand stars. I hope someday I can tell you this in person... 💫",
    fromUser: "mystery-1",
    toUser: "current-user",
    isRevealed: false,
    timestamp: new Date(Date.now() - 3600000),
    userPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"
  },
  {
    id: "2",
    message: "I love how passionate you are about poetry. Your soul speaks through words in the most beautiful way... 🌹",
    fromUser: "mystery-2",
    toUser: "current-user",
    isRevealed: true,
    timestamp: new Date(Date.now() - 7200000),
    userPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
  }
];

export const SecretAdmirerNotes = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [newNote, setNewNote] = useState("");
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const { toast } = useToast();

  const sendSecretNote = () => {
    if (!newNote.trim() || !selectedRecipient) {
      toast({
        title: "Incomplete Note",
        description: "Please write a message and select a recipient.",
        variant: "destructive"
      });
      return;
    }

    const note: SecretNote = {
      id: Date.now().toString(),
      message: newNote,
      fromUser: "current-user",
      toUser: selectedRecipient,
      isRevealed: false,
      timestamp: new Date(),
      userPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
    };

    setNotes(prev => [...prev, note]);
    setNewNote("");
    setSelectedRecipient("");

    toast({
      title: "Secret Note Sent! 🌹",
      description: "Your anonymous love note has been delivered.",
    });

    // Simulate mutual secret note for demo
    setTimeout(() => {
      toast({
        title: "Mutual Secret Admirer! 💕",
        description: "You both sent secret notes to each other! Match revealed!",
      });
    }, 3000);
  };

  const revealNote = (noteId: string) => {
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId ? { ...note, isRevealed: true } : note
      )
    );
    
    toast({
      title: "Secret Revealed! ✨",
      description: "This admirer has been revealed to you.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-romantic-blush/10 p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="romantic-glow border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 romantic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-playfair">Secret Admirer Notes 🌹</CardTitle>
            <CardDescription className="text-lg">
              Send anonymous love notes and discover your secret admirers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Send New Note */}
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-semibold">Send a Secret Note</h3>
              <Textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a romantic anonymous message... 💕"
                className="min-h-24 border-primary/20"
              />
              <div className="flex gap-2">
                <select 
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                  className="flex-1 p-2 border border-primary/20 rounded-md"
                >
                  <option value="">Select recipient...</option>
                  <option value="emma">Emma</option>
                  <option value="james">James</option>
                  <option value="sophia">Sophia</option>
                  <option value="alex">Alex</option>
                </select>
                <Button 
                  onClick={sendSecretNote}
                  className="romantic-gradient text-white"
                  disabled={!newNote.trim() || !selectedRecipient}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Secretly
                </Button>
              </div>
            </div>

            {/* Received Notes */}
            <div className="space-y-4">
              <h3 className="font-playfair text-lg font-semibold">Your Secret Admirers</h3>
              {notes.length === 0 ? (
                <Card className="border-dashed border-primary/30">
                  <CardContent className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No secret notes yet...</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <Card key={note.id} className="border-primary/20 hover:romantic-glow transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          {note.isRevealed ? (
                            <img 
                              src={note.userPhoto} 
                              alt="Admirer"
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 romantic-gradient rounded-full flex items-center justify-center">
                              <EyeOff className="w-5 h-5 text-white" />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {note.isRevealed ? (
                                <Badge variant="default" className="bg-green-500">
                                  Revealed
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="romantic-gradient text-white">
                                  Secret Admirer
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            <p className="text-foreground mb-3 italic">"{note.message}"</p>
                            
                            {!note.isRevealed && (
                              <Button 
                                onClick={() => revealNote(note.id)}
                                size="sm"
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Reveal Admirer
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
