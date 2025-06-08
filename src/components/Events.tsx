
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Heart, Coffee, Sunset, Film, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  hostName: string;
  hostPhoto: string;
  category: 'movie' | 'sunset' | 'coffee' | 'poetry' | 'music' | 'art' | 'nature';
  attendees: Array<{
    id: string;
    name: string;
    photo: string;
    level: 'loverboy' | 'lovergirl';
  }>;
}

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Sunset Poetry Reading at the Beach",
    description: "Join us for a magical evening of poetry as we watch the sunset together. Bring your favorite romantic poems to share, or just come to listen and feel inspired by the beauty around us.",
    date: "2024-12-15",
    time: "6:00 PM",
    location: "Santa Monica Beach, Pier Area",
    maxAttendees: 20,
    currentAttendees: 8,
    hostName: "Emma",
    hostPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    category: "sunset",
    attendees: [
      {
        id: "1",
        name: "Emma",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        level: "lovergirl"
      },
      {
        id: "2",
        name: "James",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        level: "loverboy"
      }
    ]
  },
  {
    id: "2",
    title: "Classic Romance Movie Night",
    description: "Cozy movie night featuring timeless romantic classics. We'll be watching 'Casablanca' followed by a discussion about what makes a perfect love story. Popcorn and tissues provided!",
    date: "2024-12-18",
    time: "7:30 PM",
    location: "Downtown Community Center",
    maxAttendees: 30,
    currentAttendees: 15,
    hostName: "James",
    hostPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
    category: "movie",
    attendees: [
      {
        id: "1",
        name: "Sofia",
        photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
        level: "lovergirl"
      },
      {
        id: "2",
        name: "Michael",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
        level: "loverboy"
      }
    ]
  },
  {
    id: "3",
    title: "Coffee & Love Letters Workshop",
    description: "Learn the lost art of writing heartfelt love letters while enjoying artisanal coffee. We'll practice different styles of romantic writing and share our favorite love quotes.",
    date: "2024-12-20",
    time: "2:00 PM",
    location: "The Literary Café, Arts District",
    maxAttendees: 12,
    currentAttendees: 7,
    hostName: "Sofia",
    hostPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=60&h=60&fit=crop&crop=face",
    category: "coffee",
    attendees: []
  }
];

export const Events = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxAttendees: 10,
    category: "coffee" as Event['category']
  });
  const { toast } = useToast();

  const getCategoryIcon = (category: Event['category']) => {
    switch (category) {
      case 'movie': return <Film className="w-5 h-5" />;
      case 'sunset': return <Sunset className="w-5 h-5" />;
      case 'coffee': return <Coffee className="w-5 h-5" />;
      case 'poetry': return <Heart className="w-5 h-5" />;
      case 'music': return <Music className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'movie': return 'bg-blue-500';
      case 'sunset': return 'bg-orange-500';
      case 'coffee': return 'bg-amber-600';
      case 'poetry': return 'bg-pink-500';
      case 'music': return 'bg-purple-500';
      default: return 'bg-primary';
    }
  };

  const handleJoinEvent = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, currentAttendees: event.currentAttendees + 1 }
        : event
    ));
    
    toast({
      title: "Joined Event! 🎉",
      description: "You're all set for this romantic gathering!",
    });
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location) {
      toast({
        title: "Incomplete Event",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const event: Event = {
      id: Date.now().toString(),
      ...newEvent,
      currentAttendees: 1,
      hostName: "You",
      hostPhoto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop&crop=face",
      attendees: []
    };

    setEvents(prev => [event, ...prev]);
    setShowCreateForm(false);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxAttendees: 10,
      category: "coffee"
    });

    toast({
      title: "Event Created! ✨",
      description: "Your romantic event is now live for hopeless romantics to join!",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="romantic-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-playfair">Romantic Events</CardTitle>
            <CardDescription className="text-lg">
              Join magical gatherings with fellow hopeless romantics ✨
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-playfair">Upcoming Events</h2>
          <Button 
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="romantic-gradient text-white"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Create Event Form */}
        {showCreateForm && (
          <Card className="romantic-glow">
            <CardHeader>
              <CardTitle className="text-xl font-playfair">Create a Romantic Event</CardTitle>
              <CardDescription>
                Bring hopeless romantics together for a magical experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Sunset Poetry Reading..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={newEvent.category}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, category: e.target.value as Event['category'] }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="coffee">Coffee & Chat</option>
                    <option value="movie">Movie Night</option>
                    <option value="sunset">Sunset Watching</option>
                    <option value="poetry">Poetry</option>
                    <option value="music">Music</option>
                    <option value="art">Art</option>
                    <option value="nature">Nature</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your romantic event..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxAttendees">Max Attendees</Label>
                  <Input
                    id="maxAttendees"
                    type="number"
                    min="2"
                    max="30"
                    value={newEvent.maxAttendees}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, maxAttendees: parseInt(e.target.value) }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Where will this magical event take place?"
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={handleCreateEvent} className="romantic-gradient text-white">
                  Create Event
                </Button>
                <Button onClick={() => setShowCreateForm(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:romantic-glow transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${getCategoryColor(event.category)} text-white`}>
                      {getCategoryIcon(event.category)}
                    </div>
                    <Badge variant="secondary">
                      {event.currentAttendees}/{event.maxAttendees} people
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-lg font-playfair font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{event.description}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{new Date(event.date).toLocaleDateString()} {event.time && `at ${event.time}`}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>Hosted by {event.hostName}</span>
                    </div>
                  </div>

                  {event.attendees.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Who's going:</p>
                      <div className="flex -space-x-2">
                        {event.attendees.slice(0, 6).map((attendee) => (
                          <img
                            key={attendee.id}
                            src={attendee.photo}
                            alt={attendee.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            title={`${attendee.name} (${attendee.level})`}
                          />
                        ))}
                        {event.attendees.length > 6 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center text-xs">
                            +{event.attendees.length - 6}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={() => handleJoinEvent(event.id)}
                    disabled={event.currentAttendees >= event.maxAttendees}
                    className="w-full romantic-gradient text-white"
                  >
                    {event.currentAttendees >= event.maxAttendees ? "Event Full" : "Join Event"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {events.length === 0 && (
          <Card className="text-center p-12">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-playfair mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">
                Be the first to create a romantic event for fellow hopeless romantics!
              </p>
              <Button 
                onClick={() => setShowCreateForm(true)}
                className="romantic-gradient text-white"
              >
                Create First Event
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
