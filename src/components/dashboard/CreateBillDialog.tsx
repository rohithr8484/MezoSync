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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import { usePythPrice } from "@/hooks/usePythPrice";
import { Receipt, RefreshCw, Copy, Share2, Home, Laptop, Zap } from "lucide-react";
import QRCode from "react-qr-code";
import { BillType } from "./BillPaySection";

interface CreateBillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBillCreated?: () => void;
}

const CreateBillDialog = ({ open, onOpenChange, onBillCreated }: CreateBillDialogProps) => {
  const { address } = useAccount();
  const { priceData, loading: priceLoading } = usePythPrice("MUSD_USD");
  const musdPrice = priceData ? parseFloat(priceData.price) : 1.0;
  
  const [payeeName, setPayeeName] = useState("");
  const [billType, setBillType] = useState<BillType>("utilities");
  const [description, setDescription] = useState("");
  const [amountUSD, setAmountUSD] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [createdBill, setCreatedBill] = useState<{ id: string; musdAmount: number } | null>(null);

  // Calculate MUSD equivalent in real-time
  const musdEquivalent = amountUSD && musdPrice 
    ? (parseFloat(amountUSD) / musdPrice).toFixed(2) 
    : "0.00";

  const resetForm = () => {
    setPayeeName("");
    setBillType("utilities");
    setDescription("");
    setAmountUSD("");
    setDueDate("");
    setCreatedBill(null);
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const handleCreateBill = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    if (!payeeName || !amountUSD || !description) {
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
      const billId = `#BP${Date.now().toString(36).toUpperCase()}`;
      const musdAmount = parseFloat(musdEquivalent);

      // Store bill locally for now (database table pending)
      const bill = {
        bill_id: billId,
        creator_address: address.toLowerCase(),
        payee_name: payeeName,
        bill_type: billType,
        description,
        amount_usd: amount,
        amount_musd: musdAmount,
        due_date: dueDate || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        amount_paid: 0,
      };

      // Save to localStorage temporarily
      const existingBills = JSON.parse(localStorage.getItem('bills') || '[]');
      existingBills.push(bill);
      localStorage.setItem('bills', JSON.stringify(existingBills));

      setCreatedBill({ id: billId, musdAmount });
      toast.success("Bill created successfully!");
      onBillCreated?.();
    } catch (error) {
      console.error('Error creating bill:', error);
      toast.error('Failed to create bill');
    } finally {
      setIsCreating(false);
    }
  };

  const paymentLink = createdBill 
    ? `${window.location.origin}/pay/${createdBill.id}?to=${address}&amount=${createdBill.musdAmount}`
    : "";

  const copyPaymentLink = () => {
    navigator.clipboard.writeText(paymentLink);
    toast.success("Payment link copied!");
  };

  const shareBill = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Bill ${createdBill?.id}`,
          text: `Pay ${createdBill?.musdAmount} MUSD for: ${description}`,
          url: paymentLink,
        });
      } catch {
        copyPaymentLink();
      }
    } else {
      copyPaymentLink();
    }
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-accent" />
            {createdBill ? "Bill Created" : "Add Bill"}
          </DialogTitle>
          <DialogDescription>
            {createdBill 
              ? "Share the QR code or link to pay this bill" 
              : "Add a bill to pay using MUSD"}
          </DialogDescription>
        </DialogHeader>

        {createdBill ? (
          <div className="space-y-4">
            {/* QR Code for payment */}
            <div className="flex justify-center p-4 bg-white rounded-lg">
              <QRCode value={paymentLink} size={180} />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm text-muted-foreground">Bill Number</p>
              <p className="font-mono font-bold text-lg">{createdBill.id}</p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-accent/10 border border-accent/20">
              <span className="text-sm">Amount Due</span>
              <span className="font-bold text-lg text-accent">{createdBill.musdAmount} MUSD</span>
            </div>

            <div className="flex gap-2">
              <Button variant="heroOutline" onClick={copyPaymentLink} className="flex-1">
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button variant="hero" onClick={shareBill} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            <Button variant="outline" onClick={resetForm} className="w-full">
              Add Another Bill
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="billType">Bill Type *</Label>
              <Select value={billType} onValueChange={(v) => setBillType(v as BillType)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select bill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rent">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      Monthly Rent
                    </div>
                  </SelectItem>
                  <SelectItem value="saas">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-4 h-4" />
                      SaaS Subscription
                    </div>
                  </SelectItem>
                  <SelectItem value="utilities">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Utilities
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payeeName">Payee Name *</Label>
              <Input
                id="payeeName"
                placeholder="e.g., City Power & Light"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="e.g., December Electricity Bill"
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
              onClick={handleCreateBill} 
              disabled={isCreating || !payeeName || !amountUSD || !description}
              className="w-full"
            >
              {isCreating ? "Creating..." : "Add Bill"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreateBillDialog;
