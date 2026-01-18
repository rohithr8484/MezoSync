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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant={action.variant}
                  onClick={action.onClick}
                  className="h-auto flex-row sm:flex-col gap-3 sm:gap-3 py-4 sm:py-6 justify-start sm:justify-center"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="space-y-0.5 text-left sm:text-center">
                    <div className="font-semibold text-sm sm:text-base">{action.label}</div>
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
