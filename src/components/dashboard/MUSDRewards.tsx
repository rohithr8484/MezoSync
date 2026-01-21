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
  Shield,
  Percent,
  Flame,
  Heart,
  Trophy,
  Store,
  Zap
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
  category: 'onboarding' | 'cashback' | 'streaks' | 'referral' | 'social' | 'challenges' | 'merchant';
}

interface RewardFeature {
  icon: React.ElementType;
  title: string;
  description: string;
  rate: string;
  color: string;
  action?: () => void;
}

const MUSDRewards = () => {
  const { address } = useAccount();

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

  const [tasks, setTasks] = useState<Task[]>([
    // Onboarding Tasks
    {
      id: "connect_wallet",
      title: "Connect Wallet",
      description: "Link your wallet to MezoSync",
      reward: 5,
      completed: true,
      icon: Wallet,
      category: 'onboarding',
    },
    {
      id: "first_save",
      title: "Make First Deposit",
      description: "Add MUSD to your savings",
      reward: 10,
      completed: false,
      icon: PiggyBank,
      category: 'onboarding',
    },
    {
      id: "first_send",
      title: "Send MUSD",
      description: "Complete your first transfer",
      reward: 5,
      completed: false,
      icon: Send,
      category: 'onboarding',
    },
    {
      id: "verify_profile",
      title: "Verify Profile",
      description: "Complete identity verification",
      reward: 15,
      completed: false,
      icon: Shield,
      category: 'onboarding',
    },
    // Streak Tasks
    {
      id: "daily_streak_3",
      title: "3-Day Streak",
      description: "Use MezoSync 3 days in a row",
      reward: 5,
      completed: false,
      icon: Flame,
      category: 'streaks',
    },
    {
      id: "weekly_streak",
      title: "Weekly Warrior",
      description: "Complete 7-day payment streak",
      reward: 15,
      completed: false,
      icon: Zap,
      category: 'streaks',
    },
    // Social Tasks
    {
      id: "first_reaction",
      title: "First Reaction",
      description: "React to a transaction in feed",
      reward: 2,
      completed: false,
      icon: Heart,
      category: 'social',
    },
    // Challenge Tasks
    {
      id: "bronze_badge",
      title: "Bronze Badge",
      description: "Complete 10 transactions",
      reward: 20,
      completed: false,
      icon: Trophy,
      category: 'challenges',
    },
  ]);

  const rewardFeatures: RewardFeature[] = [
    {
      icon: Percent,
      title: "Cashback",
      description: "Earn 0.5-1% on P2P & merchant payments",
      rate: "Up to 1%",
      color: "text-green-500",
      action: () => toast.info("Complete payments to earn cashback automatically!"),
    },
    {
      icon: Flame,
      title: "Payment Streaks",
      description: "Bonus MUSD for daily/weekly usage",
      rate: "Up to 15 MUSD",
      color: "text-orange-500",
      action: () => toast.info("Make a payment today to start your streak!"),
    },
    {
      icon: Users,
      title: "Referral Rewards",
      description: "Both users earn on first payment",
      rate: "10 MUSD each",
      color: "text-blue-500",
      action: shareInvite,
    },
    {
      icon: Heart,
      title: "Social Engagement",
      description: "Earn for reactions, notes & activity",
      rate: "2-5 MUSD",
      color: "text-pink-500",
      action: () => toast.info("React to transactions in your feed to earn MUSD!"),
    },
    {
      icon: Trophy,
      title: "Challenges & Badges",
      description: "Level up to unlock higher rewards",
      rate: "20+ MUSD",
      color: "text-yellow-500",
      action: () => toast.info("Complete 10 transactions to earn Bronze Badge!"),
    },
    {
      icon: Store,
      title: "Merchant Offers",
      description: "Extra cashback at partner stores",
      rate: "Up to 5%",
      color: "text-purple-500",
      action: () => toast.info("Partner merchant program coming soon!"),
    },
  ];

  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const earnedRewards = tasks.filter(t => t.completed).reduce((sum, t) => sum + t.reward, 0);
  const totalRewards = tasks.reduce((sum, t) => sum + t.reward, 0);
  const progress = (completedTasks / totalTasks) * 100;

  // Get onboarding tasks only for the main task list
  const onboardingTasks = tasks.filter(t => t.category === 'onboarding');

  return (
    <Card className="bg-gradient-to-br from-card via-card to-accent/5 border-border/50 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-accent/10 ring-1 ring-accent/20">
            <Gift className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg font-bold font-display">MUSD Rewards</CardTitle>
            <p className="text-xs text-muted-foreground">Earn MUSD daily</p>
          </div>
          <Badge variant="outline" className="text-xs font-mono border-accent/30 text-accent px-2 py-0.5">
            {earnedRewards}/{totalRewards}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">{completedTasks}/{totalTasks} tasks</span>
            <span className="font-medium text-accent">{progress.toFixed(0)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Reward Features Grid */}
        <div className="grid grid-cols-2 gap-2">
          {rewardFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <button
                key={index}
                onClick={feature.action}
                className="p-2.5 rounded-lg bg-background/60 border border-border/50 hover:border-accent/40 hover:bg-accent/5 transition-all text-left cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-3.5 h-3.5 ${feature.color}`} />
                  <span className="text-xs font-semibold truncate">{feature.title}</span>
                </div>
                <p className="text-[10px] text-muted-foreground line-clamp-1">{feature.description}</p>
                <Badge variant="secondary" className="mt-1.5 text-[10px] px-1.5 py-0">
                  {feature.rate}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Active Tasks */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Tasks</h4>
          <div className="space-y-1.5">
            {onboardingTasks.slice(0, 3).map((task) => {
              const Icon = task.icon;
              return (
                <div
                  key={task.id}
                  className={`
                    flex items-center gap-2.5 p-2.5 rounded-lg border transition-all
                    ${task.completed 
                      ? 'bg-accent/5 border-accent/30' 
                      : 'bg-background/60 border-border/50'
                    }
                  `}
                >
                  <div className={`p-1.5 rounded-md shrink-0 ${task.completed ? 'bg-accent/20' : 'bg-muted/50'}`}>
                    <Icon className={`w-3.5 h-3.5 ${task.completed ? 'text-accent' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className={`text-xs font-semibold truncate ${task.completed ? 'text-accent' : ''}`}>
                        {task.title}
                      </p>
                      {task.completed ? (
                        <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                      ) : (
                        <Circle className="w-3 h-3 text-muted-foreground/50 shrink-0" />
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant={task.completed ? "default" : "secondary"} 
                    className={`shrink-0 text-[10px] font-mono px-1.5 py-0 ${task.completed ? 'bg-accent text-accent-foreground' : ''}`}
                  >
                    +{task.reward}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>

        {/* Invite Section */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/20">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Invite Friends</h4>
              <p className="text-xs text-muted-foreground">Both earn 10 MUSD</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="heroOutline" 
              size="sm" 
              onClick={copyInviteLink}
              className="flex-1 text-xs h-8"
            >
              <Copy className="w-3.5 h-3.5 mr-1.5" />
              Copy Link
            </Button>
            <Button 
              variant="hero" 
              size="sm" 
              onClick={shareInvite}
              className="flex-1 text-xs h-8"
            >
              <Share2 className="w-3.5 h-3.5 mr-1.5" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MUSDRewards;
