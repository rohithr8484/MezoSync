import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, 
  Plus, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Download, 
  RefreshCw,
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  AlertCircle,
  Home,
  Laptop,
  Zap
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { format, formatDistanceToNow, isAfter, addDays } from "date-fns";
import CreateBillDialog from "./CreateBillDialog";
import { toast } from "sonner";

export type BillType = 'rent' | 'saas' | 'utilities';

interface Bill {
  id?: string;
  bill_id: string;
  payee_name: string;
  description: string;
  bill_type: BillType;
  amount_usd: number;
  amount_musd: number;
  status: string;
  due_date: string | null;
  created_at: string;
  creator_address: string;
  amount_paid?: number;
}

const getBillTypeIcon = (type: BillType) => {
  switch (type) {
    case 'rent':
      return <Home className="w-4 h-4" />;
    case 'saas':
      return <Laptop className="w-4 h-4" />;
    case 'utilities':
      return <Zap className="w-4 h-4" />;
    default:
      return <Receipt className="w-4 h-4" />;
  }
};

const getBillTypeLabel = (type: BillType) => {
  switch (type) {
    case 'rent':
      return 'Monthly Rent';
    case 'saas':
      return 'SaaS';
    case 'utilities':
      return 'Utilities';
    default:
      return type;
  }
};

// Demo bills for display
const demoBills: Bill[] = [
  {
    bill_id: "#BP24112",
    payee_name: "Urban Living Apartments",
    description: "January 2025 Rent",
    bill_type: "rent",
    amount_usd: 2400,
    amount_musd: 2400,
    status: "overdue",
    due_date: "2024-12-01",
    created_at: "2024-12-12T10:00:00Z",
    creator_address: "",
    amount_paid: 0,
  },
  {
    bill_id: "#BP24113",
    payee_name: "Notion",
    description: "Team Pro Plan - Annual",
    bill_type: "saas",
    amount_usd: 480,
    amount_musd: 480,
    status: "paid",
    due_date: "2024-12-02",
    created_at: "2024-12-02T10:00:00Z",
    creator_address: "",
    amount_paid: 480,
  },
  {
    bill_id: "#BP24114",
    payee_name: "City Power & Light",
    description: "December Electricity Bill",
    bill_type: "utilities",
    amount_usd: 185,
    amount_musd: 185,
    status: "paid",
    due_date: "2024-11-23",
    created_at: "2024-11-23T10:00:00Z",
    creator_address: "",
    amount_paid: 185,
  },
  {
    bill_id: "#BP24115",
    payee_name: "Figma",
    description: "Professional Plan",
    bill_type: "saas",
    amount_usd: 144,
    amount_musd: 144,
    status: "paid",
    due_date: "2024-11-14",
    created_at: "2024-11-14T10:00:00Z",
    creator_address: "",
    amount_paid: 144,
  },
  {
    bill_id: "#BP24116",
    payee_name: "Natural Gas Co.",
    description: "November Gas Bill",
    bill_type: "utilities",
    amount_usd: 95,
    amount_musd: 95,
    status: "paid",
    due_date: "2024-11-07",
    created_at: "2024-11-07T10:00:00Z",
    creator_address: "",
    amount_paid: 95,
  },
  {
    bill_id: "#BP24117",
    payee_name: "Sunset Properties",
    description: "December 2024 Rent",
    bill_type: "rent",
    amount_usd: 1800,
    amount_musd: 1800,
    status: "paid",
    due_date: "2024-10-21",
    created_at: "2024-10-21T10:00:00Z",
    creator_address: "",
    amount_paid: 1800,
  },
  {
    bill_id: "#BP24118",
    payee_name: "AWS",
    description: "Cloud Services - Q4",
    bill_type: "saas",
    amount_usd: 320,
    amount_musd: 320,
    status: "draft",
    due_date: "2024-10-19",
    created_at: "2024-10-19T10:00:00Z",
    creator_address: "",
    amount_paid: 0,
  },
];

const BillPaySection = () => {
  const { address } = useAccount();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [bills, setBills] = useState<Bill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const loadBills = () => {
    if (!address) {
      setBills(demoBills);
      setIsLoading(false);
      return;
    }

    // Load from localStorage temporarily (until database table is created)
    const storedBills = JSON.parse(localStorage.getItem('bills') || '[]');
    const userBills = storedBills.filter(
      (bill: Bill) => bill.creator_address === address.toLowerCase()
    );
    
    // Combine user bills with demo bills for display
    const allBills = [...userBills, ...demoBills];
    setBills(allBills);
    setIsLoading(false);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    loadBills();
  }, [address]);

  // Calculate summary stats
  const overdueAmount = bills
    .filter(bill => bill.status === 'overdue')
    .reduce((sum, bill) => sum + bill.amount_musd, 0);
  
  const dueNext30Days = bills
    .filter(bill => {
      if (!bill.due_date || bill.status === 'paid') return false;
      const dueDate = new Date(bill.due_date);
      const in30Days = addDays(new Date(), 30);
      return isAfter(dueDate, new Date()) && !isAfter(dueDate, in30Days);
    })
    .reduce((sum, bill) => sum + bill.amount_musd, 0);

  const totalPaid = bills
    .filter(bill => bill.status === 'paid')
    .reduce((sum, bill) => sum + (bill.amount_paid || 0), 0);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Paid
          </Badge>
        );
      case 'overdue':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
            <AlertCircle className="w-3 h-3" />
            Overdue
          </Badge>
        );
      case 'draft':
        return (
          <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 gap-1">
            <Receipt className="w-3 h-3" />
            Draft
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 gap-1">
            <XCircle className="w-3 h-3" />
            Cancelled
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20 gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
    }
  };

  const getBillTypeBadge = (type: BillType) => {
    const colors = {
      rent: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      saas: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      utilities: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };
    
    return (
      <Badge className={`${colors[type]} gap-1`}>
        {getBillTypeIcon(type)}
        {getBillTypeLabel(type)}
      </Badge>
    );
  };

  const exportToCSV = () => {
    const headers = ["Bill Number", "Payee", "Type", "Total (MUSD)", "Status", "Amount Due (MUSD)", "Date"];
    const rows = bills.map(bill => [
      bill.bill_id,
      bill.payee_name,
      getBillTypeLabel(bill.bill_type),
      bill.amount_musd.toFixed(2),
      bill.status,
      (bill.amount_musd - (bill.amount_paid || 0)).toFixed(2),
      bill.due_date || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bills.csv";
    a.click();
    toast.success("Bills exported successfully!");
  };

  const filteredBills = bills.filter(bill => 
    bill.payee_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.bill_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bill.bill_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!address) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Connect your wallet to pay bills</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="text-center">
                <h3 className="text-xl font-bold">Bill Pay</h3>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  Last update {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                  <RefreshCw className="w-3 h-3 cursor-pointer hover:text-accent" onClick={loadBills} />
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="hero" size="sm" onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Bill
                </Button>
                <Button variant="outline" size="sm" onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Export as .CSV
                </Button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Overdue</p>
                <p className="text-xl md:text-2xl font-bold">
                  <span className="text-red-500">{overdueAmount.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">MUSD</span>
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Due within next 30 days</p>
                <p className="text-xl md:text-2xl font-bold">
                  <span>{dueNext30Days.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">MUSD</span>
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Average time to pay</p>
                <p className="text-xl md:text-2xl font-bold">
                  <span>5</span>
                  <span className="text-sm text-muted-foreground ml-1">days</span>
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                <p className="text-xl md:text-2xl font-bold text-green-500">
                  <span>{totalPaid.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground ml-1">MUSD</span>
                </p>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="p-4 border-b border-border/50 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-3.5 h-3.5" />
                Filter
                <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-[10px]">2</Badge>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowUpDown className="w-3.5 h-3.5" />
                Sort Order
              </Button>
              <Badge variant="outline" className="text-xs">Total: &gt;100</Badge>
              <Badge variant="outline" className="text-xs">Date: Last 6 months</Badge>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-48"
              />
            </div>
          </div>

          {/* Bill Table */}
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background/50 border-b border-border/50">
                  <tr className="text-xs text-muted-foreground">
                    <th className="p-4 text-left w-8">
                      <input type="checkbox" className="rounded border-border" />
                    </th>
                    <th className="p-4 text-left font-medium">Bill Number</th>
                    <th className="p-4 text-left font-medium">Payee</th>
                    <th className="p-4 text-left font-medium">Type</th>
                    <th className="p-4 text-left font-medium">Total</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Amount Due</th>
                    <th className="p-4 text-left font-medium">Due Date</th>
                    <th className="p-4 text-left font-medium w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill, index) => {
                      const amountDue = bill.amount_musd - (bill.amount_paid || 0);
                      const dateStr = bill.due_date 
                        ? format(new Date(bill.due_date), "MMM d, yyyy")
                        : "-";
                      
                      return (
                        <tr 
                          key={bill.bill_id + index} 
                          className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4">
                            <input 
                              type="checkbox" 
                              className="rounded border-border"
                              defaultChecked={bill.status === 'paid'}
                            />
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-sm text-accent">
                              {bill.bill_id}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{bill.payee_name}</span>
                            <p className="text-xs text-muted-foreground">{bill.description}</p>
                          </td>
                          <td className="p-4">
                            {getBillTypeBadge(bill.bill_type)}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold">
                              {bill.amount_musd.toLocaleString()} MUSD
                            </span>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(bill.status)}
                          </td>
                          <td className="p-4">
                            <span className={amountDue === 0 ? "text-muted-foreground" : ""}>
                              {amountDue.toLocaleString()} MUSD
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground text-sm">
                            {dateStr}
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={9} className="p-8 text-center">
                        <Receipt className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">No bills found</p>
                        <Button 
                          variant="hero" 
                          size="sm" 
                          onClick={() => setCreateDialogOpen(true)} 
                          className="mt-4"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Bill
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateBillDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onBillCreated={() => loadBills()}
      />
    </>
  );
};

export default BillPaySection;
