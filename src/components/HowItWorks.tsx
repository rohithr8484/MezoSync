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
      title: "Send or Receive MUSD",
      description: "Transfer MUSD instantly with zero fees to anyone, anywhere"
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent animate-pulse-slow" />
      <div className="absolute top-10 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-blob [animation-delay:3s]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            How it works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get started with Mezo Sync - Simple financial services without the complexity
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Connecting dotted lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 border-t-2 border-dashed border-primary/30 -translate-y-1/2 animate-pulse-slow" />
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-y-1/2 animate-shimmer" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 relative z-10 group cursor-pointer hover:-translate-y-3 hover:scale-105">
                  <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-2 border-primary mb-4 mx-auto group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[var(--shadow-accent)] relative z-10">
                    <span className="text-2xl font-bold text-primary group-hover:animate-bounce-slow">{step.number}</span>
                  </div>
                  
                  <div className="flex justify-center mb-4 relative z-10">
                    <step.icon className="w-8 h-8 text-accent group-hover:scale-125 group-hover:animate-float transition-all duration-300" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-center text-foreground group-hover:text-accent transition-colors duration-300 relative z-10">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center group-hover:text-foreground transition-colors duration-300 relative z-10">
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
