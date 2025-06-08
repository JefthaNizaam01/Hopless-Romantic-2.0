
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Heart, Coffee, Calendar, MoreVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'match';
  timestamp: Date;
  type?: 'text' | 'coffee_request' | 'event_invite' | 'poem_collaboration';
}

interface Conversation {
  id: string;
  matchName: string;
  matchPhoto: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  level: 'loverboy' | 'lovergirl';
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    matchName: "Emma",
    matchPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    lastMessage: "I'd love to write a poem together! 💕",
    lastMessageTime: "5m ago",
    unreadCount: 2,
    isOnline: true,
    level: "lovergirl"
  },
  {
    id: "2",
    matchName: "James",
    matchPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    lastMessage: "How about that coffee date? ☕",
    lastMessageTime: "2h ago",
    unreadCount: 0,
    isOnline: false,
    level: "loverboy"
  }
];

const sampleMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I loved your profile, especially your thoughts on love languages 💕",
    sender: "match",
    timestamp: new Date(Date.now() - 3600000)
  },
  {
    id: "2",
    text: "Thank you! Your poetry section really caught my eye. Do you write often?",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000)
  },
  {
    id: "3",
    text: "Almost every day! Poetry is how I express my deepest feelings. Would you like to try writing one together?",
    sender: "match",
    timestamp: new Date(Date.now() - 1800000)
  },
  {
    id: "4",
    text: "I'd love to write a poem together! 💕",
    sender: "match",
    timestamp: new Date(Date.now() - 300000)
  }
];

export const Messages = () => {
  const [conversations] = useState(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(() => {
      const responses = [
        "That's so sweet! You always know what to say 💕",
        "I'm smiling so big right now 😊",
        "Can't wait to see you again!",
        "You make my heart skip a beat ✨"
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "match",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, response]);
    }, 1500);
  };

  const sendCoffeeRequest = () => {
    if (!selectedConversation) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: `☕ I'd love to take you out for coffee! Are you free this weekend?`,
      sender: "user",
      timestamp: new Date(),
      type: "coffee_request"
    };

    setMessages(prev => [...prev, message]);
    toast({
      title: "Coffee Date Request Sent! ☕",
      description: `You've asked ${selectedConversation.matchName} for a coffee date!`,
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="max-w-6xl mx-auto p-4 h-screen flex">
        {/* Conversations List */}
        <div className="w-1/3 pr-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Messages</CardTitle>
              <CardDescription>Your romantic conversations</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`p-4 cursor-pointer hover:bg-secondary/50 transition-colors ${
                      selectedConversation?.id === conversation.id ? 'bg-secondary' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={conversation.matchPhoto} 
                          alt={conversation.matchName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold truncate">{conversation.matchName}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {conversation.level === 'loverboy' ? '💙' : '💗'}
                            </Badge>
                            {conversation.unreadCount > 0 && (
                              <Badge variant="default" className="bg-primary text-white text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {conversation.lastMessageTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="w-2/3">
          {selectedConversation ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img 
                        src={selectedConversation.matchPhoto} 
                        alt={selectedConversation.matchName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {selectedConversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.matchName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {selectedConversation.isOnline ? 'Online now' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={sendCoffeeRequest}
                      size="sm" 
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      <Coffee className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Calendar className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'user'
                            ? 'romantic-gradient text-white'
                            : 'bg-secondary text-foreground'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a romantic message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="romantic-gradient text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-3">
                  <Button 
                    onClick={sendCoffeeRequest}
                    size="sm" 
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    <Coffee className="w-4 h-4 mr-1" />
                    Coffee Date
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    Write Poem
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-playfair mb-2">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose someone to start chatting with
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
