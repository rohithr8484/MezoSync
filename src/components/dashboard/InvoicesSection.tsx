import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Clock, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import CreateInvoiceDialog from "./CreateInvoiceDialog";

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
}

const InvoicesSection = () => {
  const { address } = useAccount();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadInvoices = () => {
    if (!address) {
      setInvoices([]);
      setIsLoading(false);
      return;
    }

    // Load from localStorage temporarily (until database table is created)
    const storedInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
    const userInvoices = storedInvoices.filter(
      (inv: Invoice) => inv.creator_address === address.toLowerCase()
    );
    setInvoices(userInvoices.slice(0, 5));
    setIsLoading(false);
  };

  useEffect(() => {
    loadInvoices();
  }, [address]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Paid</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Cancelled</Badge>;
      default:
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Pending</Badge>;
    }
  };

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
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-accent/10">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Invoices</h3>
                <p className="text-xs text-muted-foreground">Create & manage invoices in USD/MUSD</p>
              </div>
            </div>
            <Button variant="hero" size="sm" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create
            </Button>
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
          ) : invoices && invoices.length > 0 ? (
            <div className="space-y-3">
              {invoices.map((invoice) => {
                const timeAgo = formatDistanceToNow(new Date(invoice.created_at), { addSuffix: true });
                
                return (
                  <div 
                    key={invoice.id} 
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors border border-border/50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      {getStatusIcon(invoice.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground truncate">
                          {invoice.client_name}
                        </p>
                        <span className="text-xs font-mono text-muted-foreground">
                          {invoice.invoice_id}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {invoice.description}
                      </p>
                    </div>

                    <div className="text-right flex flex-col items-end gap-1">
                      <p className="font-semibold text-accent">
                        {invoice.amount_musd.toFixed(2)} MUSD
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${invoice.amount_usd.toFixed(2)}
                      </p>
                    </div>

                    {getStatusBadge(invoice.status)}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
              <p className="text-muted-foreground">No invoices yet</p>
              <p className="text-sm text-muted-foreground mt-1">Create your first invoice to get started</p>
              <Button variant="hero" size="sm" onClick={() => setCreateDialogOpen(true)} className="mt-4">
                <Plus className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
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
