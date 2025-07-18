import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Bot, Shield, Award } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const Landing = () => {
  const { connectWallet, isConnected } = useWallet();

  const steps = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Post",
      description: "Share your skill or what you want to learn"
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: "Match",
      description: "AI finds perfect skill exchange partners"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Barter",
      description: "Secure skill exchange with smart contracts"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Earn NFT",
      description: "Get reputation NFTs for completed exchanges"
    }
  ];

  const features = [
    {
      title: "AI Matchmaking",
      description: "Smart AI finds the perfect skill exchange matches based on your needs and expertise."
    },
    {
      title: "Blockchain Reputation",
      description: "Build trust with immutable reputation NFTs that showcase your successful exchanges."
    },
    {
      title: "Free Mentoring",
      description: "Access free mentoring and skill sharing from the community without any fees."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 web3-gradient rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillXchange</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-foreground hover:text-primary transition-colors">
              Explore Skills
            </Link>
            <Link to="/post" className="text-foreground hover:text-primary transition-colors">
              Post Skill
            </Link>
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
          </nav>
          <Button 
            onClick={connectWallet}
            className="connect-wallet-btn"
            disabled={isConnected}
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            SkillXchange
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Trade Skills. No Cash. Build Trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="web3-button">
                Explore Skills
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/post">
              <Button size="lg" variant="outline" className="hover-lift">
                Post a Skill
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center skill-card">
                <CardHeader>
                  <div className="w-12 h-12 web3-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    {step.icon}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkillXchange?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="skill-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 web3-gradient rounded-lg flex items-center justify-center">
                      {index === 0 && <Bot className="w-4 h-4 text-white" />}
                      {index === 1 && <Shield className="w-4 h-4 text-white" />}
                      {index === 2 && <Award className="w-4 h-4 text-white" />}
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4 bg-muted/30">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 SkillXchange. Built with Web3 for the community.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;