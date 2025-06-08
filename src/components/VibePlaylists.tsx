
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Music, Heart, Play, Plus, Users, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Song {
  id: string;
  title: string;
  artist: string;
  addedBy: string;
  isFirstDance?: boolean;
}

interface Playlist {
  id: string;
  name: string;
  partnerName: string;
  partnerPhoto: string;
  songs: Song[];
  coverImage: string;
  firstDanceSong?: Song;
}

const samplePlaylists: Playlist[] = [
  {
    id: "1",
    name: "Emma & You ❤️",
    partnerName: "Emma",
    partnerPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
    coverImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
    songs: [
      { id: "1", title: "Perfect", artist: "Ed Sheeran", addedBy: "Emma" },
      { id: "2", title: "All of Me", artist: "John Legend", addedBy: "You", isFirstDance: true },
      { id: "3", title: "Thinking Out Loud", artist: "Ed Sheeran", addedBy: "Emma" }
    ],
    firstDanceSong: { id: "2", title: "All of Me", artist: "John Legend", addedBy: "You", isFirstDance: true }
  }
];

const musicTastes = [
  { genre: "R&B", percentage: 85 },
  { genre: "Pop", percentage: 72 },
  { genre: "Jazz", percentage: 68 },
  { genre: "Classical", percentage: 55 },
  { genre: "Indie", percentage: 60 }
];

export const VibePlaylists = () => {
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [newSong, setNewSong] = useState({ title: "", artist: "" });
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(playlists[0]);
  const { toast } = useToast();

  const addSong = () => {
    if (!newSong.title.trim() || !newSong.artist.trim() || !selectedPlaylist) return;

    const song: Song = {
      id: Date.now().toString(),
      title: newSong.title,
      artist: newSong.artist,
      addedBy: "You"
    };

    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === selectedPlaylist.id 
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );

    setSelectedPlaylist(prev => 
      prev ? { ...prev, songs: [...prev.songs, song] } : null
    );

    setNewSong({ title: "", artist: "" });

    toast({
      title: "Song Added! 🎵",
      description: `Added "${song.title}" to your shared playlist!`,
    });
  };

  const setFirstDanceSong = (song: Song) => {
    if (!selectedPlaylist) return;

    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === selectedPlaylist.id 
          ? { 
              ...playlist, 
              firstDanceSong: song,
              songs: playlist.songs.map(s => ({ ...s, isFirstDance: s.id === song.id }))
            }
          : playlist
      )
    );

    setSelectedPlaylist(prev => 
      prev ? { 
        ...prev, 
        firstDanceSong: song,
        songs: prev.songs.map(s => ({ ...s, isFirstDance: s.id === song.id }))
      } : null
    );

    toast({
      title: "First Dance Song Set! 💃",
      description: `"${song.title}" is now your first dance song!`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/10 to-romantic-blush/10 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="romantic-glow border-primary/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 romantic-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-playfair">VibePlaylists 🎶</CardTitle>
            <CardDescription className="text-lg">
              Create collaborative playlists with your matches based on shared music tastes
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Music Compatibility */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="font-playfair">Music Compatibility</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {musicTastes.map((taste) => (
                <div key={taste.genre} className="flex items-center justify-between">
                  <span className="font-medium">{taste.genre}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full romantic-gradient"
                        style={{ width: `${taste.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold">{taste.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shared Playlists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Playlist List */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="font-playfair">Shared Playlists</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {playlists.map((playlist) => (
                <Card 
                  key={playlist.id}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedPlaylist?.id === playlist.id 
                      ? 'ring-2 ring-primary romantic-glow' 
                      : 'hover:romantic-glow'
                  }`}
                  onClick={() => setSelectedPlaylist(playlist)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={playlist.coverImage} 
                        alt={playlist.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{playlist.name}</h4>
                        <div className="flex items-center gap-2">
                          <img 
                            src={playlist.partnerPhoto} 
                            alt={playlist.partnerName}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-sm text-muted-foreground">
                            with {playlist.partnerName}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {playlist.songs.length} songs
                        </p>
                      </div>
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Selected Playlist */}
          {selectedPlaylist && (
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedPlaylist.coverImage} 
                    alt={selectedPlaylist.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <CardTitle className="font-playfair">{selectedPlaylist.name}</CardTitle>
                    <CardDescription>
                      Collaborative playlist with {selectedPlaylist.partnerName}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* First Dance Song */}
                {selectedPlaylist.firstDanceSong && (
                  <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-4 h-4 text-primary" />
                        <span className="text-sm font-semibold text-primary">First Dance Song</span>
                      </div>
                      <h4 className="font-semibold">{selectedPlaylist.firstDanceSong.title}</h4>
                      <p className="text-sm text-muted-foreground">{selectedPlaylist.firstDanceSong.artist}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Add New Song */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Add a Song</h4>
                  <div className="flex gap-2">
                    <Input
                      value={newSong.title}
                      onChange={(e) => setNewSong(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Song title..."
                      className="flex-1"
                    />
                    <Input
                      value={newSong.artist}
                      onChange={(e) => setNewSong(prev => ({ ...prev, artist: e.target.value }))}
                      placeholder="Artist..."
                      className="flex-1"
                    />
                    <Button 
                      onClick={addSong}
                      size="sm"
                      className="romantic-gradient text-white"
                      disabled={!newSong.title.trim() || !newSong.artist.trim()}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Songs List */}
                <div className="space-y-2">
                  <h4 className="font-semibold">Songs ({selectedPlaylist.songs.length})</h4>
                  {selectedPlaylist.songs.map((song) => (
                    <Card key={song.id} className="hover:bg-secondary/30 transition-colors">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button size="sm" variant="outline" className="w-8 h-8 p-0">
                              <Play className="w-3 h-3" />
                            </Button>
                            <div>
                              <h5 className="font-medium">{song.title}</h5>
                              <p className="text-sm text-muted-foreground">{song.artist}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {song.addedBy}
                            </Badge>
                            {song.isFirstDance && (
                              <Badge className="bg-primary text-white text-xs">
                                💃 First Dance
                              </Badge>
                            )}
                            {!song.isFirstDance && (
                              <Button
                                onClick={() => setFirstDanceSong(song)}
                                size="sm"
                                variant="outline"
                                className="text-xs border-primary text-primary hover:bg-primary hover:text-white"
                              >
                                Set as First Dance
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
