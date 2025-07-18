import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Star, MapPin, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Skill {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'teach' | 'learn';
  location: 'remote' | 'in-person';
  duration: string;
  description: string;
  user: {
    name: string;
    reputation: number;
    verified: boolean;
  };
  createdAt: string;
}

const ExploreSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [filteredSkills, setFilteredSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recent');

  // Mock data for demonstration
  const mockSkills: Skill[] = [
    {
      id: '1',
      title: 'React Development',
      category: 'Frontend',
      level: 'intermediate',
      type: 'teach',
      location: 'remote',
      duration: '2 hours',
      description: 'I can help you build modern React applications with hooks, state management, and best practices.',
      user: {
        name: 'Sarah Chen',
        reputation: 4.8,
        verified: true
      },
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'UI/UX Design Feedback',
      category: 'Design',
      level: 'advanced',
      type: 'teach',
      location: 'remote',
      duration: '1.5 hours',
      description: 'Get professional feedback on your designs and learn about user-centered design principles.',
      user: {
        name: 'Alex Rodriguez',
        reputation: 4.9,
        verified: true
      },
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      title: 'Spring Boot Basics',
      category: 'Backend',
      level: 'beginner',
      type: 'learn',
      location: 'remote',
      duration: '3 hours',
      description: 'Looking to learn Spring Boot fundamentals and build REST APIs.',
      user: {
        name: 'Mike Johnson',
        reputation: 4.2,
        verified: false
      },
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      title: 'Figma Prototyping',
      category: 'Design',
      level: 'intermediate',
      type: 'teach',
      location: 'in-person',
      duration: '2 hours',
      description: 'Learn advanced Figma techniques for creating interactive prototypes.',
      user: {
        name: 'Emma Wilson',
        reputation: 4.7,
        verified: true
      },
      createdAt: '2024-01-12'
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from the API
    // const fetchSkills = async () => {
    //   try {
    //     const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`);
    //     setSkills(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch skills:', error);
    //   }
    // };
    // fetchSkills();
    
    setSkills(mockSkills);
    setFilteredSkills(mockSkills);
  }, []);

  useEffect(() => {
    let filtered = skills;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(skill =>
        skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(skill => skill.type === typeFilter);
    }

    // Location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(skill => skill.location === locationFilter);
    }

    // Sort
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'reputation':
        filtered.sort((a, b) => b.user.reputation - a.user.reputation);
        break;
      case 'verified':
        filtered.sort((a, b) => (b.user.verified ? 1 : 0) - (a.user.verified ? 1 : 0));
        break;
    }

    setFilteredSkills(filtered);
  }, [skills, searchTerm, typeFilter, locationFilter, sortBy]);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'teach' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 web3-gradient rounded-lg flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillXchange</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/post" className="text-foreground hover:text-primary transition-colors">
              Post Skill
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search skills..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Type</h3>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="teach">Teach</SelectItem>
                  <SelectItem value="learn">Learn</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Location</h3>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="in-person">In-person</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="reputation">Best Reputation</SelectItem>
                  <SelectItem value="verified">Verified Users</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </aside>

          {/* Skills Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Explore Skills</h1>
              <p className="text-muted-foreground">{filteredSkills.length} skills found</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSkills.map((skill) => (
                <Card key={skill.id} className="skill-card">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{skill.title}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getLevelColor(skill.level)}>
                            {skill.level}
                          </Badge>
                          <Badge className={getTypeColor(skill.type)}>
                            {skill.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {skill.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {skill.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {skill.location}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium">
                              {skill.user.name[0]}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{skill.user.name}</p>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs">{skill.user.reputation}</span>
                              {skill.user.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Link to={`/match?skill=${skill.id}`}>
                        <Button className="w-full web3-button">
                          Connect
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ExploreSkills;