import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
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
  AlertCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { format, formatDistanceToNow, isAfter, addDays } from "date-fns";
import CreateInvoiceDialog from "./CreateInvoiceDialog";
import { toast } from "sonner";

interface Invoice {
  id?: string;
  invoice_id: string;
  client_name: string;
  description: string;
  amount_usd: number;
  amount_musd: number;
  status: string;
  due_date: string | null;
  created_at: string;
  creator_address: string;
  amount_paid?: number;
}

// Demo invoices for display
const demoInvoices: Invoice[] = [
  {
    invoice_id: "#24112",
    client_name: "Anna Svensson",
    description: "Design Services",
    amount_usd: 6400,
    amount_musd: 6400,
    status: "overdue",
    due_date: "2024-12-01",
    created_at: "2024-12-12T10:00:00Z",
    creator_address: "",
    amount_paid: 0,
  },
  {
    invoice_id: "#24113",
    client_name: "Lars Müller",
    description: "Web Development",
    amount_usd: 8200,
    amount_musd: 8200,
    status: "paid",
    due_date: "2024-12-02",
    created_at: "2024-12-02T10:00:00Z",
    creator_address: "",
    amount_paid: 2350,
  },
  {
    invoice_id: "#24114",
    client_name: "Marie Dubois",
    description: "Consulting",
    amount_usd: 12800,
    amount_musd: 12800,
    status: "paid",
    due_date: "2024-11-23",
    created_at: "2024-11-23T10:00:00Z",
    creator_address: "",
    amount_paid: 7200,
  },
  {
    invoice_id: "#24115",
    client_name: "Thomas Schmidt",
    description: "Marketing Campaign",
    amount_usd: 6400,
    amount_musd: 6400,
    status: "paid",
    due_date: "2024-11-14",
    created_at: "2024-11-14T10:00:00Z",
    creator_address: "",
    amount_paid: 6400,
  },
  {
    invoice_id: "#24116",
    client_name: "Emily Johnson",
    description: "UI/UX Design",
    amount_usd: 9150,
    amount_musd: 9150,
    status: "paid",
    due_date: "2024-11-07",
    created_at: "2024-11-07T10:00:00Z",
    creator_address: "",
    amount_paid: 500,
  },
  {
    invoice_id: "#24117",
    client_name: "William Smith",
    description: "App Development",
    amount_usd: 6400,
    amount_musd: 6400,
    status: "paid",
    due_date: "2024-10-21",
    created_at: "2024-10-21T10:00:00Z",
    creator_address: "",
    amount_paid: 2000,
  },
  {
    invoice_id: "#24118",
    client_name: "Sophie Martin",
    description: "Brand Strategy",
    amount_usd: 8550,
    amount_musd: 8550,
    status: "draft",
    due_date: "2024-10-19",
    created_at: "2024-10-19T10:00:00Z",
    creator_address: "",
    amount_paid: 950,
  },
];

const InvoicesSection = () => {
  const { address } = useAccount();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const loadInvoices = () => {
    if (!address) {
      setInvoices(demoInvoices);
      setIsLoading(false);
      return;
    }

    // Load from localStorage temporarily (until database table is created)
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const userInvoices = storedInvoices.filter(
      (inv: Invoice) => inv.creator_address === address.toLowerCase()
    );
    
    // Combine user invoices with demo invoices for display
    const allInvoices = [...userInvoices, ...demoInvoices];
    setInvoices(allInvoices);
    setIsLoading(false);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    loadInvoices();
  }, [address]);

  // Calculate summary stats
  const overdueAmount = invoices
    .filter(inv => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount_musd, 0);
  
  const dueNext30Days = invoices
    .filter(inv => {
      if (!inv.due_date || inv.status === 'paid') return false;
      const dueDate = new Date(inv.due_date);
      const in30Days = addDays(new Date(), 30);
      return isAfter(dueDate, new Date()) && !isAfter(dueDate, in30Days);
    })
    .reduce((sum, inv) => sum + inv.amount_musd, 0);

  const upcomingPayout = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + (inv.amount_paid || 0), 0);

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
            <FileText className="w-3 h-3" />
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

  const exportToCSV = () => {
    const headers = ["Invoice Number", "Customer", "Total (MUSD)", "Status", "Amount Due (MUSD)", "Date"];
    const rows = invoices.map(inv => [
      inv.invoice_id,
      inv.client_name,
      inv.amount_musd.toFixed(2),
      inv.status,
      (inv.amount_musd - (inv.amount_paid || 0)).toFixed(2),
      inv.due_date || ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoices.csv";
    a.click();
    toast.success("Invoices exported successfully!");
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.invoice_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!address) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <p className="text-muted-foreground">Connect your wallet to create invoices</p>
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
                <h3 className="text-xl font-bold">Invoices</h3>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
                  Last update {formatDistanceToNow(lastUpdate, { addSuffix: true })}
                  <RefreshCw className="w-3 h-3 cursor-pointer hover:text-accent" onClick={loadInvoices} />
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="hero" size="sm" onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
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
                <p className="text-xs text-muted-foreground mb-1">Average time to get paid</p>
                <p className="text-xl md:text-2xl font-bold">
                  <span>34</span>
                  <span className="text-sm text-muted-foreground ml-1">days</span>
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground mb-1">Upcoming Payout</p>
                <p className="text-xl md:text-2xl font-bold text-green-500">
                  <span>{upcomingPayout.toLocaleString()}</span>
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
              <Badge variant="outline" className="text-xs">Total: &gt;1000</Badge>
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

          {/* Invoice Table */}
          {isLoading ? (
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-32" />
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
                    <th className="p-4 text-left font-medium">Invoice Number</th>
                    <th className="p-4 text-left font-medium">Customer</th>
                    <th className="p-4 text-left font-medium">Total</th>
                    <th className="p-4 text-left font-medium">Status</th>
                    <th className="p-4 text-left font-medium">Amount Due</th>
                    <th className="p-4 text-left font-medium">Date</th>
                    <th className="p-4 text-left font-medium w-8"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map((invoice, index) => {
                      const amountDue = invoice.amount_musd - (invoice.amount_paid || 0);
                      const dateStr = invoice.due_date 
                        ? format(new Date(invoice.due_date), "MMM d, yyyy")
                        : "-";
                      
                      return (
                        <tr 
                          key={invoice.invoice_id + index} 
                          className="border-b border-border/30 hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4">
                            <input 
                              type="checkbox" 
                              className="rounded border-border"
                              defaultChecked={invoice.status === 'paid' || invoice.status === 'draft'}
                            />
                          </td>
                          <td className="p-4">
                            <span className="font-mono text-sm text-accent">
                              {invoice.invoice_id}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="font-medium">{invoice.client_name}</span>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold">
                              {invoice.amount_musd.toLocaleString()} MUSD
                            </span>
                          </td>
                          <td className="p-4">
                            {getStatusBadge(invoice.status)}
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
                      <td colSpan={8} className="p-8 text-center">
                        <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                        <p className="text-muted-foreground">No invoices found</p>
                        <Button 
                          variant="hero" 
                          size="sm" 
                          onClick={() => setCreateDialogOpen(true)} 
                          className="mt-4"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create Invoice
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

      <CreateInvoiceDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onInvoiceCreated={() => loadInvoices()}
      />
    </>
  );
};

export default InvoicesSection;
