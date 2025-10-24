import { Shield, Lock, Users, TrendingUp } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "Your assets are protected with military-grade encryption and multi-signature authentication."
  },
  {
    icon: Lock,
    title: "Full Custody Control",
    description: "You hold the keys. Your Bitcoin, your control. No intermediaries, no surprises."
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join a community making the switch to smarter, safer banking powered by Mezo Network."
  },
  {
    icon: TrendingUp,
    title: "Transparent Growth",
    description: "Track your wealth in real-time. No hidden fees, no complex terms, just honest returns."
  }
];

const Trust = () => {
  return (
    <section id="security" className="py-24 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-blob [animation-delay:2s]" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent animate-gradient">
            Built on Trust & Security
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your financial freedom starts with peace of mind
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex gap-6 p-8 rounded-2xl border border-border/50 bg-card hover:border-accent/50 transition-all duration-500 hover:shadow-[var(--shadow-xl)] group hover:-translate-y-3 hover:scale-105 animate-fade-up cursor-pointer relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  opacity: 0,
                  animationFillMode: 'forwards'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-[var(--shadow-accent)] group-hover:bg-[image:var(--gradient-accent)]">
                    <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground group-hover:animate-float transition-all duration-300" />
                  </div>
                </div>
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trust;
