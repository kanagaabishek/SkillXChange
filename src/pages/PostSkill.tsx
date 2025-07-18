import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';

interface SkillForm {
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | '';
  type: 'teach' | 'learn' | '';
  location: 'remote' | 'in-person' | '';
  duration: string;
  description: string;
  tags: string[];
  availability: string;
}

const PostSkill = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [form, setForm] = useState<SkillForm>({
    title: '',
    category: '',
    level: '',
    type: '',
    location: '',
    duration: '',
    description: '',
    tags: [],
    availability: ''
  });

  const categories = [
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Mobile Development',
    'Data Science',
    'DevOps',
    'Machine Learning',
    'Cybersecurity',
    'Product Management',
    'Marketing',
    'Other'
  ];

  const handleInputChange = (field: keyof SkillForm, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !form.tags.includes(newTag.trim())) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form
      if (!form.title || !form.category || !form.level || !form.type || !form.location || !form.description) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive"
        });
        return;
      }

      // Submit to backend API
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/skills`, form);
      
      // Submit to AI for canonical tagging
      try {
        // const aiResponse = await axios.post(`${process.env.NEXT_PUBLIC_AI_API_URL}/api/tag-skill`, {
        //   title: form.title,
        //   description: form.description,
        //   category: form.category
        // });
        
        // Mock AI response for demo
        const mockAITags = ['react', 'frontend', 'javascript'];
        
        toast({
          title: "Skill Posted Successfully!",
          description: `Your skill "${form.title}" has been posted and tagged by AI: ${mockAITags.join(', ')}`,
        });
      } catch (aiError) {
        console.error('AI tagging failed:', aiError);
        toast({
          title: "Skill Posted!",
          description: "Your skill has been posted, but AI tagging is temporarily unavailable.",
        });
      }

      // Reset form
      setForm({
        title: '',
        category: '',
        level: '',
        type: '',
        location: '',
        duration: '',
        description: '',
        tags: [],
        availability: ''
      });

    } catch (error) {
      console.error('Failed to post skill:', error);
      toast({
        title: "Error",
        description: "Failed to post your skill. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 web3-gradient rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillXchange</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
              Explore Skills
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/explore">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Explore
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Post a Skill</h1>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle>Share Your Expertise</CardTitle>
              <CardDescription>
                Post a skill you can teach or something you'd like to learn. Our AI will help match you with the perfect exchange partner.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Skill Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., React Development, UI/UX Design"
                      value={form.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={form.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="level">Level *</Label>
                    <Select value={form.level} onValueChange={(value) => handleInputChange('level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select value={form.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Teach or Learn" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teach">I can teach this</SelectItem>
                        <SelectItem value="learn">I want to learn this</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Select value={form.location} onValueChange={(value) => handleInputChange('location', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Remote or In-person" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="in-person">In-person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 2 hours, 1 day, 1 week"
                      value={form.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Input
                      id="availability"
                      placeholder="e.g., Weekends, Evenings, Flexible"
                      value={form.availability}
                      onChange={(e) => handleInputChange('availability', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what you can teach or what you're looking to learn. Include any specific topics, tools, or outcomes."
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Add
                    </Button>
                  </div>
                  {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {form.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className="w-full web3-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Skill'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostSkill;