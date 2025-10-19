import { Card, CardContent } from "@/components/ui/card";
import { Send, Download, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SendMoneyDialog from "./SendMoneyDialog";
import ReceiveMoneyDialog from "./ReceiveMoneyDialog";
import AddToSavingsDialog from "./AddToSavingsDialog";

const QuickActions = ({ currentSavings, onSavingsAdded }: { currentSavings: number; onSavingsAdded: (amount: number) => void }) => {
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [receiveDialogOpen, setReceiveDialogOpen] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const actions = [
    {
      icon: Send,
      label: "Send MUSD",
      description: "To anyone, instantly",
      onClick: () => setSendDialogOpen(true),
      variant: "hero" as const,
    },
    {
      icon: Download,
      label: "Receive",
      description: "Get paid easily",
      onClick: () => setReceiveDialogOpen(true),
      variant: "heroOutline" as const,
    },
    {
      icon: PiggyBank,
      label: "Save",
      description: "Earn rewards",
      onClick: () => setSaveDialogOpen(true),
      variant: "heroOutline" as const,
    },
  ];

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  onClick={action.onClick}
                  className="h-auto flex-col gap-3 py-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold">{action.label}</div>
                    <div className="text-xs opacity-80">{action.description}</div>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <SendMoneyDialog open={sendDialogOpen} onOpenChange={setSendDialogOpen} />
      <ReceiveMoneyDialog open={receiveDialogOpen} onOpenChange={setReceiveDialogOpen} />
      <AddToSavingsDialog 
        open={saveDialogOpen} 
        onOpenChange={setSaveDialogOpen}
        currentSavings={currentSavings}
        onSavingsAdded={onSavingsAdded}
      />
    </>
  );
};

export default QuickActions;
