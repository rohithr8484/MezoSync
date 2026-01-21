import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, PiggyBank } from "lucide-react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  recipient_address: string | null;
  sender_address: string | null;
  note: string | null;
  created_at: string;
  wallet_address: string;
}

// Sample avatar images for demo purposes
const avatarImages = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face",
];

const getAvatarForAddress = (address: string | null) => {
  if (!address) return null;
  const index = parseInt(address.slice(-1), 16) % avatarImages.length;
  return avatarImages[index];
};

const getInitialsFromAddress = (address: string | null) => {
  if (!address) return "??";
  return address.slice(2, 4).toUpperCase();
};

const RecentTransactions = () => {
  const { address } = useAccount();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', address],
    queryFn: async () => {
      if (!address) return [];

      // Fetch transactions where user is sender OR receiver
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .or(`wallet_address.eq.${address.toLowerCase()},recipient_address.eq.${address.toLowerCase()},sender_address.eq.${address.toLowerCase()}`)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!address,
    refetchInterval: 10000,
  });

  const getTransactionDisplay = (transaction: Transaction) => {
    const isIncoming = transaction.transaction_type === 'receive' || 
      (transaction.recipient_address?.toLowerCase() === address?.toLowerCase() && transaction.transaction_type !== 'save');
    
    switch (transaction.transaction_type) {
      case 'send':
        return {
          label: transaction.recipient_address 
            ? `${transaction.recipient_address.slice(0, 6)}...${transaction.recipient_address.slice(-4)}`
            : 'Unknown',
          amount: `-${transaction.amount.toFixed(2)} MUSD`,
          icon: ArrowUpRight,
          iconBg: "bg-blue-500/10",
          iconColor: "text-blue-500",
          amountColor: "text-foreground",
          avatar: getAvatarForAddress(transaction.recipient_address),
          initials: getInitialsFromAddress(transaction.recipient_address),
        };
      case 'receive':
        return {
          label: transaction.sender_address 
            ? `${transaction.sender_address.slice(0, 6)}...${transaction.sender_address.slice(-4)}`
            : 'Unknown',
          amount: `+${transaction.amount.toFixed(2)} MUSD`,
          icon: ArrowDownLeft,
          iconBg: "bg-green-500/10",
          iconColor: "text-green-500",
          amountColor: "text-green-600",
          avatar: getAvatarForAddress(transaction.sender_address),
          initials: getInitialsFromAddress(transaction.sender_address),
        };
      case 'save':
        return {
          label: 'Savings Account',
          amount: `+${transaction.amount.toFixed(2)} MUSD`,
          icon: PiggyBank,
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          amountColor: "text-green-600",
          avatar: null,
          initials: "SA",
        };
      default:
        return {
          label: 'Unknown',
          amount: `${transaction.amount.toFixed(2)} MUSD`,
          icon: ArrowUpRight,
          iconBg: "bg-muted/10",
          iconColor: "text-muted-foreground",
          amountColor: "text-foreground",
          avatar: null,
          initials: "??",
        };
    }
  };

  if (!address) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Connect your wallet to view recent activity</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3">
                <Skeleton className="w-12 h-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-20" />
              </div>
            ))}
          </div>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const display = getTransactionDisplay(transaction);
              const Icon = display.icon;
              const timeAgo = formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true });
              
              return (
                <div 
                  key={transaction.id} 
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                >
                  {/* Avatar with person image or icon fallback */}
                  <div className="relative">
                    {display.avatar ? (
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage src={display.avatar} alt={display.label} />
                        <AvatarFallback className={`${display.iconBg} ${display.iconColor}`}>
                          {display.initials}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className={`w-12 h-12 rounded-full ${display.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${display.iconColor}`} />
                      </div>
                    )}
                    {/* Small icon overlay for transaction type */}
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${display.iconBg} border-2 border-background flex items-center justify-center`}>
                      <Icon className={`w-3 h-3 ${display.iconColor}`} />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {display.label}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {transaction.note || timeAgo}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className={`font-semibold ${display.amountColor}`}>
                      {display.amount}
                    </p>
                    {transaction.note && (
                      <p className="text-xs text-muted-foreground">{timeAgo}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground mt-1">Your activity will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
