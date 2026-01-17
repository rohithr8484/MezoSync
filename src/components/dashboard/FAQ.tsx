import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I get started with MezoSync?",
    answer: "Simply connect your wallet using RainbowKit, Wagmi, or Boar Wallet. Once connected, you can access all features including savings, payments, and remittances directly from your dashboard."
  },
  {
    question: "Is my MUSD safe?",
    answer: "Yes! MUSD is backed by Bitcoin collateral and secured by the Mezo network. Your funds are protected by bank-level security protocols and you maintain full control of your private keys."
  },
  {
    question: "What can I do with MUSD?",
    answer: "You can save MUSD to earn yield, send instant payments to anyone globally, receive remittances from family abroad, and use it for everyday purchases — all without traditional banking fees."
  },
  {
    question: "Are there any fees?",
    answer: "MezoSync offers minimal transaction fees compared to traditional banking. Sending and receiving MUSD costs a fraction of what banks and remittance services charge."
  },
  {
    question: "How do savings work?",
    answer: "Add MUSD to your savings vault and watch your balance grow. Your savings are securely stored on-chain and you can withdraw anytime with no lock-up periods."
  },
  {
    question: "Can I use this without crypto experience?",
    answer: "Absolutely! MezoSync is designed for everyone. We've removed the crypto complexity so you can focus on managing your money, just like a traditional banking app but with better features."
  }
];

const FAQ = () => {
  return (
    <Card className="bg-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-xl font-bold font-display">Frequently Asked Questions</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-4 data-[state=open]:bg-secondary/30 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:text-accent hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQ;
