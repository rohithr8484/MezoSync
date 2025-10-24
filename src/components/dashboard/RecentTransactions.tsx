import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, PiggyBank } from "lucide-react";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string;
  transaction_type: string;
  amount: number;
  recipient_address: string | null;
  sender_address: string | null;
  note: string | null;
  created_at: string;
}

const RecentTransactions = () => {
  const { address } = useAccount();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['transactions', address],
    queryFn: async () => {
      if (!address) return [];

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('wallet_address', address.toLowerCase())
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: !!address,
    refetchInterval: 10000, // Refetch every 10 seconds
  });

  const getTransactionDisplay = (transaction: Transaction) => {
    switch (transaction.transaction_type) {
      case 'send':
        return {
          label: transaction.recipient_address 
            ? `${transaction.recipient_address.slice(0, 6)}...${transaction.recipient_address.slice(-4)}`
            : 'Unknown',
          amount: `-$${transaction.amount.toFixed(2)}`,
          icon: ArrowUpRight,
          iconBg: "bg-blue-500/10",
          iconColor: "text-blue-500",
          amountColor: "text-foreground"
        };
      case 'receive':
        return {
          label: transaction.sender_address 
            ? `${transaction.sender_address.slice(0, 6)}...${transaction.sender_address.slice(-4)}`
            : 'Unknown',
          amount: `+$${transaction.amount.toFixed(2)}`,
          icon: ArrowDownLeft,
          iconBg: "bg-green-500/10",
          iconColor: "text-green-500",
          amountColor: "text-green-600"
        };
      case 'save':
        return {
          label: 'Savings Account',
          amount: `+$${transaction.amount.toFixed(2)}`,
          icon: PiggyBank,
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          amountColor: "text-green-600"
        };
      default:
        return {
          label: 'Unknown',
          amount: `$${transaction.amount.toFixed(2)}`,
          icon: ArrowUpRight,
          iconBg: "bg-muted/10",
          iconColor: "text-muted-foreground",
          amountColor: "text-foreground"
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
                  <div className={`w-12 h-12 rounded-xl ${display.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${display.iconColor}`} />
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
