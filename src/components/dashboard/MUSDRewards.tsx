import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, 
  CheckCircle2, 
  Circle, 
  Users, 
  Copy, 
  Share2,
  Wallet,
  Send,
  PiggyBank,
  Shield
} from "lucide-react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  icon: React.ElementType;
}

const MUSDRewards = () => {
  const { address } = useAccount();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "connect_wallet",
      title: "Connect Wallet",
      description: "Link your wallet to MezoSync",
      reward: 5,
      completed: true,
      icon: Wallet,
    },
    {
      id: "first_save",
      title: "Make First Deposit",
      description: "Add MUSD to your savings",
      reward: 10,
      completed: false,
      icon: PiggyBank,
    },
    {
      id: "first_send",
      title: "Send MUSD",
      description: "Complete your first transfer",
      reward: 5,
      completed: false,
      icon: Send,
    },
    {
      id: "verify_profile",
      title: "Verify Profile",
      description: "Complete identity verification",
      reward: 15,
      completed: false,
      icon: Shield,
    },
  ]);

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const earnedRewards = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.reward, 0);
  const totalRewards = tasks.reduce((sum, t) => sum + t.reward, 0);
  const progress = (completedTasks / totalTasks) * 100;

  // Generate invite link based on wallet address
  const inviteLink = address 
    ? `${window.location.origin}?ref=${address.slice(0, 8)}` 
    : `${window.location.origin}?ref=guest`;

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    toast.success("Invite link copied to clipboard!");
  };

  const shareInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join MezoSync",
          text: "Join MezoSync and get 10 MUSD bonus! Use my referral link:",
          url: inviteLink,
        });
      } catch (error) {
        copyInviteLink();
      }
    } else {
      copyInviteLink();
    }
  };

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-border/50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl translate-y-1/2 translate-x-1/2" />
      
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 ring-1 ring-accent/20">
              <Gift className="w-6 h-6 text-accent" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold font-display">MUSD Rewards</CardTitle>
              <p className="text-sm text-muted-foreground">Complete tasks & earn MUSD</p>
            </div>
          </div>
          <Badge variant="outline" className="w-fit text-sm font-mono border-accent/30 text-accent px-3 py-1">
            {earnedRewards} / {totalRewards} MUSD
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{completedTasks} of {totalTasks} tasks completed</span>
            <span className="font-medium text-accent">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tasks.map((task) => {
            const Icon = task.icon;
            return (
              <div
                key={task.id}
                className={`
                  flex items-center gap-3 p-3.5 rounded-xl border transition-all
                  ${task.completed 
                    ? 'bg-accent/5 border-accent/30' 
                    : 'bg-background/60 border-border/50 hover:border-accent/20'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg shrink-0
                  ${task.completed ? 'bg-accent/20' : 'bg-muted/50'}
                `}>
                  <Icon className={`w-4 h-4 ${task.completed ? 'text-accent' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-semibold truncate ${task.completed ? 'text-accent' : 'text-foreground'}`}>
                      {task.title}
                    </p>
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-muted-foreground/50 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{task.description}</p>
                </div>
                <Badge 
                  variant={task.completed ? "default" : "secondary"} 
                  className={`shrink-0 text-xs font-mono ${task.completed ? 'bg-accent text-accent-foreground' : ''}`}
                >
                  +{task.reward}
                </Badge>
              </div>
            );
          })}
        </div>

        {/* Invite Section */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/20">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Invite Friends</h4>
              <p className="text-sm text-muted-foreground">Earn 10 MUSD for each friend who joins</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-background/80 rounded-lg border border-border/50 overflow-hidden">
              <span className="text-sm font-mono text-muted-foreground truncate flex-1">
                {inviteLink}
              </span>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button 
                variant="heroOutline" 
                size="sm" 
                onClick={copyInviteLink}
                className="flex-1 sm:flex-none"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button 
                variant="hero" 
                size="sm" 
                onClick={shareInvite}
                className="flex-1 sm:flex-none"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MUSDRewards;
