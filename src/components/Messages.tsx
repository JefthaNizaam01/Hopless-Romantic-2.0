import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, MoreVertical, Paperclip, Smile, XCircle, UserMinus, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "match";
  timestamp: Date;
  reactions?: string[];
}

interface Conversation {
  id: string;
  matchName: string;
  matchPhoto: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  level: "loverboy" | "lovergirl";
}

const sampleConversations: Conversation[] = [
  {
    id: "1",
    matchName: "Emma",
    matchPhoto:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    lastMessage: "I'd love to write a poem together! 💕",
    lastMessageTime: "5m ago",
    unreadCount: 2,
    isOnline: true,
    level: "lovergirl",
  },
  {
    id: "2",
    matchName: "James",
    matchPhoto:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    lastMessage: "How about that coffee date? ☕",
    lastMessageTime: "2h ago",
    unreadCount: 0,
    isOnline: false,
    level: "loverboy",
  },
];

const sampleMessages: Message[] = [
  {
    id: "1",
    text: "Hi! I loved your profile, especially your thoughts on love languages 💕",
    sender: "match",
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: "2",
    text: "Thank you! Your poetry section really caught my eye. Do you write often?",
    sender: "user",
    timestamp: new Date(Date.now() - 3000000),
  },
  {
    id: "3",
    text: "Almost every day! Poetry is how I express my deepest feelings. Would you like to try writing one together?",
    sender: "match",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "4",
    text: "I'd love to write a poem together! 💕",
    sender: "match",
    timestamp: new Date(Date.now() - 300000),
  },
];

const emojiList = ["😍", "🥰", "😂", "🔥", "😳", "😭", "😘", "💖", "💋", "💌", "💞", "💗", "💔", "💍", "💃", "🕺"];

export const Messages = () => {
  const [conversations, setConversations] = useState(sampleConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const { toast } = useToast();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedConversation]);

  // Simulate typing indicator
  useEffect(() => {
    if (!typing) return;
    const timeout = setTimeout(() => setTyping(false), 1200);
    return () => clearTimeout(timeout);
  }, [typing]);

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
    setTyping(true);
    // Simulate match response
    setTimeout(() => {
      const responses = [
        "That's so sweet! You always know what to say 💕",
        "I'm smiling so big right now 😊",
        "Can't wait to see you again!",
        "You make my heart skip a beat ✨",
      ];
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "match",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  const handleEmoji = (emoji: string) => {
    setNewMessage((msg) => msg + emoji);
    setShowEmoji(false);
  };

  const handleAttach = () => {
    toast({ title: "Attachment feature coming soon!", description: "You can send images and GIFs soon." });
  };

  const handleUnmatch = () => {
    toast({ title: "Unmatched", description: `You have unmatched with ${selectedConversation?.matchName}.` });
    setConversations((prev) => prev.filter((c) => c.id !== selectedConversation?.id));
    setSelectedConversation(conversations[0] || null);
  };

  const handleReport = () => {
    toast({ title: "Reported", description: `You have reported ${selectedConversation?.matchName}.` });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="min-h-screen w-full romantic-gradient flex items-center justify-center py-6 px-2">
      <div className="w-full max-w-5xl h-[80vh] flex rounded-3xl glass-card shadow-romantic overflow-hidden">
        {/* Sidebar: Matches */}
        <aside className="hidden md:flex flex-col w-1/3 bg-white/30 glass-card p-4 gap-2 border-r border-white/20">
          <h2 className="text-lg font-playfair font-bold mb-2 text-rose-600 flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500 animate-pulse" /> Matches
          </h2>
          <div className="flex-1 overflow-y-auto pr-2">
            {conversations.length === 0 && (
              <div className="text-center text-muted-foreground mt-10">No matches yet</div>
            )}
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all mb-1 hover:bg-rose-100/60 ${
                  selectedConversation?.id === conversation.id ? "bg-rose-200/80" : ""
                }`}
              >
                <div className="relative">
                  <img
                    src={conversation.matchPhoto}
                    alt={conversation.matchName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-pink-300 shadow-glow"
                  />
                  {conversation.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold truncate text-rose-700">
                      {conversation.matchName}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground truncate block">
                    {conversation.lastMessage}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {conversation.lastMessageTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </aside>
        {/* Chat Area */}
        <main className="flex-1 flex flex-col bg-white/60 glass-card relative">
          {/* Header */}
          {selectedConversation ? (
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/30 px-6 py-4 bg-white/40 glass-card">
              <div className="flex items-center gap-3">
                <img
                  src={selectedConversation.matchPhoto}
                  alt={selectedConversation.matchName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-pink-300 shadow-glow"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-rose-700">
                      {selectedConversation.matchName}
                    </span>
                    {selectedConversation.isOnline && (
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {selectedConversation.isOnline ? "Online now" : "Last seen recently"}
                  </span>
                  <span className="ml-2 text-xs text-pink-400">
                    {selectedConversation.level === "loverboy" ? "💙" : "💗"}
                  </span>
                </div>
              </div>
              <div className="relative">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-rose-400 hover:bg-rose-100"
                  onClick={() => setShowOptions((v) => !v)}
                >
                  <MoreVertical className="w-5 h-5" />
                </Button>
                {showOptions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-romantic z-10 p-2 flex flex-col gap-1">
                    <Button variant="ghost" className="justify-start text-rose-500" onClick={handleUnmatch}>
                      <UserMinus className="w-4 h-4 mr-2" /> Unmatch
                    </Button>
                    <Button variant="ghost" className="justify-start text-yellow-600" onClick={handleReport}>
                      <AlertTriangle className="w-4 h-4 mr-2" /> Report
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
          ) : null}
          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {selectedConversation ? (
              <>
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl shadow-romantic transition-all relative text-base font-medium ${
                        message.sender === "user"
                          ? "bg-gradient-to-br from-pink-400 to-rose-500 text-white animate-romantic-pulse"
                          : "bg-white/80 text-rose-700 border border-pink-100"
                      }`}
                    >
                      <span>{message.text}</span>
                      <span className={`block text-xs mt-1 ${message.sender === "user" ? "text-white/70" : "text-rose-400"}`}>
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className="flex justify-start">
                    <div className="px-4 py-2 rounded-2xl bg-white/80 text-rose-400 border border-pink-100 animate-pulse">
                      {selectedConversation.matchName} is typing...
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-rose-400">
                <Heart className="w-16 h-16 mb-4 animate-pulse" />
                <h3 className="text-xl font-playfair mb-2">Select a match to start chatting</h3>
                <p className="text-muted-foreground">Your romantic conversations will appear here</p>
              </div>
            )}
          </CardContent>
          {/* Input Bar */}
          {selectedConversation && (
            <div className="border-t border-white/30 px-6 py-4 bg-white/40 glass-card flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                className="text-pink-400 hover:bg-rose-100"
                onClick={() => setShowEmoji((v) => !v)}
              >
                <Smile className="w-5 h-5" />
              </Button>
              {showEmoji && (
                <div className="absolute bottom-20 left-10 z-20 bg-white rounded-xl shadow-romantic p-2 flex flex-wrap gap-1 w-64">
                  {emojiList.map((emoji) => (
                    <button
                      key={emoji}
                      className="text-2xl hover:scale-125 transition-transform"
                      onClick={() => handleEmoji(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a romantic message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 bg-white/80 rounded-full border border-pink-200 focus:ring-pink-400"
              />
              <Button
                size="icon"
                variant="ghost"
                className="text-pink-400 hover:bg-rose-100"
                onClick={handleAttach}
              >
                <Paperclip className="w-5 h-5" />
              </Button>
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="romantic-gradient text-white rounded-full px-6 py-2 font-bold shadow-glow-pink hover:scale-105 transition-transform"
              >
                Send
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
