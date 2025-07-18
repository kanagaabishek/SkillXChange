import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Users, MessageCircle, Award } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';

interface SessionDetail {
  id: string;
  skillA: {
    title: string;
    user: {
      name: string;
      wallet: string;
    };
  };
  skillB: {
    title: string;
    user: {
      name: string;
      wallet: string;
    };
  };
  status: 'locked' | 'in-progress' | 'completed';
  outline: {
    objectives: string[];
    timeline: string[];
    deliverables: string[];
  };
  progress: {
    userACompleted: boolean;
    userBCompleted: boolean;
  };
  contractAddress: string;
  createdAt: string;
  completedAt?: string;
}

const SessionDetail = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { toast } = useToast();
  const { account, isConnected } = useWallet();
  const [session, setSession] = useState<SessionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);

  // Mock session data for demonstration
  const mockSession: SessionDetail = {
    id: sessionId || '1',
    skillA: {
      title: 'React Development',
      user: {
        name: 'Sarah Chen',
        wallet: '0x742d35Cc6634C0532925a3b8D4f'
      }
    },
    skillB: {
      title: 'UI/UX Design Feedback',
      user: {
        name: 'Alex Rodriguez',
        wallet: '0x8ba1f109551bD432803012645Hb'
      }
    },
    status: 'in-progress',
    outline: {
      objectives: [
        'Build a responsive React component library',
        'Implement modern state management patterns',
        'Create reusable UI components',
        'Provide comprehensive design feedback',
        'Establish design system principles',
        'Optimize user experience flow'
      ],
      timeline: [
        'Week 1: Initial component setup and basic styling',
        'Week 2: Advanced React patterns and state management',
        'Week 3: Design review and feedback implementation',
        'Week 4: Final refinements and documentation'
      ],
      deliverables: [
        'Complete React component library',
        'Design system documentation',
        'Code review and feedback',
        'UX improvement recommendations'
      ]
    },
    progress: {
      userACompleted: false,
      userBCompleted: false
    },
    contractAddress: '0x1234567890123456789012345678901234567890',
    createdAt: '2024-01-15T10:00:00Z'
  };

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from the API
        // const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/${sessionId}`);
        // setSession(response.data);
        
        // Mock delay for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSession(mockSession);
      } catch (error) {
        console.error('Failed to fetch session:', error);
        toast({
          title: "Error",
          description: "Failed to load session details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleConfirmCompletion = async () => {
    if (!isConnected || !session) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to confirm completion.",
        variant: "destructive"
      });
      return;
    }

    setConfirming(true);
    try {
      // In a real app, this would call the smart contract
      // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sessions/${sessionId}/complete`, {
      //   userWallet: account
      // });

      toast({
        title: "Completion Confirmed!",
        description: "Your completion has been recorded on the blockchain.",
      });

      // Update local state
      setSession(prev => prev ? {
        ...prev,
        progress: {
          ...prev.progress,
          userACompleted: account === session.skillA.user.wallet ? true : prev.progress.userACompleted,
          userBCompleted: account === session.skillB.user.wallet ? true : prev.progress.userBCompleted
        }
      } : null);

    } catch (error) {
      console.error('Failed to confirm completion:', error);
      toast({
        title: "Error",
        description: "Failed to confirm completion. Please try again.",
        variant: "destructive"
      });
    } finally {
      setConfirming(false);
    }
  };

  const getProgressPercentage = () => {
    if (!session) return 0;
    const completedCount = (session.progress.userACompleted ? 1 : 0) + (session.progress.userBCompleted ? 1 : 0);
    return (completedCount / 2) * 100;
  };

  const isUserParticipant = () => {
    if (!session || !account) return false;
    return account === session.skillA.user.wallet || account === session.skillB.user.wallet;
  };

  const hasUserCompleted = () => {
    if (!session || !account) return false;
    if (account === session.skillA.user.wallet) return session.progress.userACompleted;
    if (account === session.skillB.user.wallet) return session.progress.userBCompleted;
    return false;
  };

  const isSessionComplete = () => {
    return session?.progress.userACompleted && session?.progress.userBCompleted;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading session details...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Session Not Found</h1>
          <Link to="/explore">
            <Button className="web3-button">
              Back to Explore
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 web3-gradient rounded-lg flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
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
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/match">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Matches
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Session Details</h1>
          </div>

          {/* Session Status */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Skill Exchange Session
                </CardTitle>
                <Badge variant={session.status === 'completed' ? 'default' : 'secondary'}>
                  {session.status}
                </Badge>
              </div>
              <CardDescription>
                Smart Contract: {session.contractAddress}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-primary">{session.skillA.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {session.skillA.user.name}
                  </p>
                  <div className="flex items-center gap-2">
                    {session.progress.userACompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">
                      {session.progress.userACompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-accent">{session.skillB.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    by {session.skillB.user.name}
                  </p>
                  <div className="flex items-center gap-2">
                    {session.progress.userBCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Clock className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">
                      {session.progress.userBCompleted ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {getProgressPercentage()}% Complete
                  </span>
                </div>
                <Progress value={getProgressPercentage()} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* AI-Generated Session Outline */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI-Generated Session Outline</CardTitle>
              <CardDescription>
                Our AI has created a structured plan for your skill exchange based on both participants' expertise levels.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">Learning Objectives</h3>
                <ul className="space-y-2">
                  {session.outline.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Timeline</h3>
                <ul className="space-y-2">
                  {session.outline.timeline.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Expected Deliverables</h3>
                <ul className="space-y-2">
                  {session.outline.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Completion Actions */}
          {isUserParticipant() && !isSessionComplete() && (
            <Card>
              <CardHeader>
                <CardTitle>Confirm Completion</CardTitle>
                <CardDescription>
                  Once you've completed your part of the skill exchange, confirm it here to earn your reputation NFT.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {hasUserCompleted() ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span>You have confirmed completion. Waiting for your exchange partner.</span>
                  </div>
                ) : (
                  <Button 
                    onClick={handleConfirmCompletion}
                    className="web3-button"
                    disabled={confirming}
                  >
                    {confirming ? 'Confirming...' : 'Confirm Completion'}
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Session Complete */}
          {isSessionComplete() && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">Session Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    Both participants have confirmed completion. Your reputation NFTs are being minted.
                  </p>
                  <Link to="/profile">
                    <Button className="web3-button">
                      View Your Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetail;