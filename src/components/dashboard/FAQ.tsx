import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  // Getting Started
  {
    question: "How do I get started with MezoSync?",
    answer: "Simply connect your wallet using RainbowKit, Wagmi, or Boar Wallet. Once connected, you can access all features including savings, invoices, payments, and rewards directly from your dashboard."
  },
  {
    question: "Is my MUSD safe?",
    answer: "Yes! MUSD is backed by Bitcoin collateral and secured by the Mezo network. Your funds are protected by bank-level security protocols and you maintain full control of your private keys."
  },
  // MUSD & Balance
  {
    question: "What is MUSD and how does it work?",
    answer: "MUSD is a Bitcoin-backed stablecoin on the Mezo network. It maintains a 1:1 peg with USD while being collateralized by Bitcoin. You can use it for savings, payments, and invoicing with real-time price tracking."
  },
  {
    question: "How is my live MUSD balance calculated?",
    answer: "Your live balance shows your total MUSD holdings updated in real-time using Pyth Network price feeds. The Bitcoin equivalent is calculated based on current BTC/USD rates, refreshing every few seconds."
  },
  // Savings Feature
  {
    question: "How do savings work?",
    answer: "Add MUSD to your savings vault and watch your balance grow. Your savings are securely stored on-chain and you can withdraw anytime with no lock-up periods. Track your savings progress with our visual indicators."
  },
  // Invoices Feature
  {
    question: "How do I create and manage invoices?",
    answer: "Click 'Create Invoice' to generate professional invoices in USD with real-time MUSD conversion. Add client details, set due dates, and share via QR code or payment link. Track invoice status (Paid, Pending, Overdue, Draft) and export to CSV."
  },
  {
    question: "How do clients pay my invoices?",
    answer: "Clients can pay using the QR code or payment link you share. The invoice shows the MUSD amount due, and payments are tracked automatically. You'll see overdue amounts, upcoming payouts, and average payment times in your dashboard."
  },
  // Payments & Transactions
  {
    question: "How do I send and receive MUSD?",
    answer: "Use Quick Actions to send MUSD to any wallet address or receive via QR code. All transactions appear in Recent Activity with person avatars, amounts in MUSD format, and timestamps. Both sent and received transactions are tracked."
  },
  {
    question: "What are the transaction fees?",
    answer: "MezoSync offers minimal transaction fees compared to traditional banking. Sending and receiving MUSD costs a fraction of what banks and remittance services charge, with transparent fee display before confirmation."
  },
  // MUSD Rewards
  {
    question: "How do MUSD Rewards work?",
    answer: "Earn MUSD through multiple reward programs: Cashback (0.5-1% on payments), Payment Streaks (bonus for daily/weekly usage), Referral Rewards (10 MUSD each for you and friends), Social Engagement (reactions & activity), Challenges & Badges (level up rewards), and Merchant Offers (up to 5% at partners)."
  },
  {
    question: "How do I earn cashback and streak bonuses?",
    answer: "Cashback is automatically applied to P2P and merchant payments (0.5-1%). Payment streaks reward consecutive daily or weekly app usage with up to 15 MUSD bonus. Complete onboarding tasks like connecting wallet, first deposit, and first send to earn additional rewards."
  },
  {
    question: "How does the referral program work?",
    answer: "Share your unique invite link with friends. When they sign up and make their first payment, both of you earn 10 MUSD. Use the Copy Link or Share button in the MUSD Rewards section to invite friends."
  },
  // Network & Technical
  {
    question: "What is the Mezo Network Status?",
    answer: "The Network Status shows real-time Mezo blockchain health including current block height, network latency, and connection status. Green indicators mean everything is running smoothly for your transactions."
  },
  {
    question: "How accurate are the price feeds?",
    answer: "We use Pyth Network oracle for real-time price data, updating every 400ms for high-frequency accuracy. BTC/USD and MUSD/USD rates are displayed with live indicators showing the freshness of data."
  },
  // General
  {
    question: "Can I use this without crypto experience?",
    answer: "Absolutely! MezoSync is designed for everyone. We've removed the crypto complexity so you can focus on managing your MUSD, just like a traditional banking app but with better features and lower fees."
  },
  {
    question: "How do I export my data?",
    answer: "Use the 'Export as .CSV' button in the Invoices section to download your invoice history. Transaction data can be viewed in Recent Activity. Your wallet address serves as your account identifier."
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
