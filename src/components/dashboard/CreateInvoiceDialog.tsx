import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { usePythPrice } from "@/hooks/usePythPrice";
import { FileText, RefreshCw, Copy, Share2 } from "lucide-react";
import QRCode from "react-qr-code";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreated?: () => void;
}

const CreateInvoiceDialog = ({ open, onOpenChange, onInvoiceCreated }: CreateInvoiceDialogProps) => {
  const { address } = useAccount();
  const { priceData, loading: priceLoading } = usePythPrice("MUSD_USD");
  const musdPrice = priceData ? parseFloat(priceData.price) : 1.0;
  
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [description, setDescription] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState<{ id: string; musdAmount: number } | null>(null);

  // Calculate MUSD equivalent in real-time
  const musdEquivalent = amountUSD && musdPrice 
    ? (parseFloat(amountUSD) / musdPrice).toFixed(2) 
    : "0.00";

  const resetForm = () => {
    setClientName("");
    setClientEmail("");
    setDescription("");
    setAmountUSD("");
    setDueDate("");
    setCreatedInvoice(null);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const handleCreateInvoice = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!clientName || !amountUSD || !description) {
      toast.error("Please fill in all required fields");
      return;
    }

    const amount = parseFloat(amountUSD);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsCreating(true);
    try {
      const invoiceId = `INV-${Date.now().toString(36).toUpperCase()}`;
      const musdAmount = parseFloat(musdEquivalent);

      // Store invoice locally for now (database table pending)
      const invoice = {
        invoice_id: invoiceId,
        creator_address: address.toLowerCase(),
        client_name: clientName,
        client_email: clientEmail || null,
        description,
        amount_usd: amount,
        amount_musd: musdAmount,
        due_date: dueDate || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      };

      // Save to localStorage temporarily
      const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
      existingInvoices.push(invoice);
      localStorage.setItem('invoices', JSON.stringify(existingInvoices));

      setCreatedInvoice({ id: invoiceId, musdAmount });
      toast.success("Invoice created successfully!");
      onInvoiceCreated?.();
    } catch (error) {
      console.error('Error creating invoice:', error);
      toast.error('Failed to create invoice');
    } finally {
      setIsCreating(false);
    }
  };

  const paymentLink = createdInvoice 
    ? `${window.location.origin}/pay/${createdInvoice.id}?to=${address}&amount=${createdInvoice.musdAmount}`
    : "";

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Payment link copied!");
  };

  const shareInvoice = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Invoice ${createdInvoice?.id}`,
          text: `Pay ${createdInvoice?.musdAmount} MUSD for: ${description}`,
          url: paymentLink,
        });
      } catch {
        copyPaymentLink();
      }
    } else {
      copyPaymentLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" />
            {createdInvoice ? "Invoice Created" : "Create Invoice"}
          </DialogTitle>
          <DialogDescription>
            {createdInvoice 
              ? "Share the QR code or link with your client" 
              : "Create an invoice in USD with real-time MUSD conversion"}
          </DialogDescription>
        </DialogHeader>

        {createdInvoice ? (
          <div className="space-y-4">
            {/* QR Code for payment */}
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <QRCode value={paymentLink} size={180} />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">Invoice ID</p>
              <p className="font-mono font-bold text-lg">{createdInvoice.id}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-sm">Amount Due</span>
              <span className="font-bold text-lg text-accent">{createdInvoice.musdAmount} MUSD</span>
            </div>

            <div className="flex gap-2">
              <Button variant="heroOutline" onClick={copyPaymentLink} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="hero" onClick={shareInvoice} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button variant="outline" onClick={resetForm} className="w-full">
              Create Another Invoice
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name *</Label>
              <Input
                id="clientName"
                placeholder="John Doe"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Client Email (optional)</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="client@example.com"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Web design services for March 2024..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amountUSD">Amount (USD) *</Label>
              <Input
                id="amountUSD"
                type="number"
                placeholder="100.00"
                value={amountUSD}
                onChange={(e) => setAmountUSD(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>

            {/* Real-time MUSD conversion */}
            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  MUSD Equivalent
                  {priceLoading && <RefreshCw className="w-3 h-3 animate-spin" />}
                </span>
                <span className="font-bold text-lg text-accent">{musdEquivalent} MUSD</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Rate: 1 MUSD = ${musdPrice?.toFixed(4) || "1.00"} USD
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date (optional)</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <Button 
              variant="hero" 
              onClick={handleCreateInvoice} 
              disabled={isCreating || !clientName || !amountUSD || !description}
              className="w-full"
            >
              {isCreating ? "Creating..." : "Create Invoice"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
