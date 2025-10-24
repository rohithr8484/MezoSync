import { Wallet, PiggyBank, Send, TrendingUp, Activity } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Wallet,
      title: "Connect Your Wallet",
      description: "Simple setup - connect your wallet or create a new account in seconds"
    },
    {
      number: 2,
      icon: PiggyBank,
      title: "Add MUSD",
      description: "Deposit MUSD to your account and start managing your finances"
    },
    {
      number: 3,
      icon: Send,
      title: "Send or Receive Money",
      description: "Transfer money instantly with zero fees to anyone, anywhere"
    },
    {
      number: 4,
      icon: TrendingUp,
      title: "Earn 4.5% APY",
      description: "Automatically earn interest on your savings with no minimum balance"
    },
    {
      number: 5,
      icon: Activity,
      title: "Track Everything",
      description: "Monitor all your transactions and savings growth in real-time"
    }
  ];

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started with Mezo Sync - Simple financial services without the complexity
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting dotted lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-primary/30 -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative z-10">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary mb-4 mx-auto">
                    <span className="text-2xl font-bold text-primary">{step.number}</span>
                  </div>
                  
                  <div className="flex justify-center mb-4">
                    <step.icon className="w-8 h-8 text-accent" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-center text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
