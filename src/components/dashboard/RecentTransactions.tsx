import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownLeft, PiggyBank } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "received",
    from: "Sarah Johnson",
    amount: "+$250.00",
    date: "Today, 2:30 PM",
    icon: ArrowDownLeft,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: 2,
    type: "sent",
    to: "Mike Chen",
    amount: "-$85.50",
    date: "Today, 11:15 AM",
    icon: ArrowUpRight,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: 3,
    type: "savings",
    to: "Savings Account",
    amount: "+$12.34",
    date: "Yesterday, 9:00 PM",
    note: "Weekly interest",
    icon: PiggyBank,
    iconBg: "bg-accent/10",
    iconColor: "text-accent"
  },
  {
    id: 4,
    type: "received",
    from: "Acme Corp",
    amount: "+$1,500.00",
    date: "Dec 3, 5:45 PM",
    note: "Salary payment",
    icon: ArrowDownLeft,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: 5,
    type: "sent",
    to: "Maria Garcia",
    amount: "-$120.00",
    date: "Dec 2, 3:20 PM",
    note: "Dinner split",
    icon: ArrowUpRight,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500"
  }
];

const RecentTransactions = () => {
  return (
    <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-sm text-accent hover:underline">View all</button>
        </div>

        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon;
            return (
              <div key={transaction.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className={`w-12 h-12 rounded-xl ${transaction.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-6 h-6 ${transaction.iconColor}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {transaction.type === "received" ? transaction.from : transaction.to}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {transaction.note || transaction.date}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.amount.startsWith('+') ? 'text-green-600' : 'text-foreground'
                  }`}>
                    {transaction.amount}
                  </p>
                  {transaction.note && (
                    <p className="text-xs text-muted-foreground">{transaction.date}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
