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
    title: "Trusted by Millions",
    description: "Join thousands of users who've already made the switch to smarter, safer banking."
  },
  {
    icon: TrendingUp,
    title: "Transparent Growth",
    description: "Track your wealth in real-time. No hidden fees, no complex terms, just honest returns."
  }
];

const Trust = () => {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
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
                className="flex gap-6 p-8 rounded-2xl border border-border/50 bg-card hover:border-accent/50 transition-all duration-300 hover:shadow-[var(--shadow-lg)] group"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
