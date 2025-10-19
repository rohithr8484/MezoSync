import { Card, CardContent } from "@/components/ui/card";
import savingsIcon from "@/assets/savings-icon.png";
import paymentsIcon from "@/assets/payments-icon.png";
import remittanceIcon from "@/assets/remittance-icon.png";

const services = [
  {
    icon: savingsIcon,
    title: "Smart Savings",
    description: "Put your MUSD to work with high-yield savings accounts. Watch your balance grow automatically.",
    features: ["4.5% Annual Return", "Withdraw anytime", "MUSD stablecoin"]
  },
  {
    icon: paymentsIcon,
    title: "Send & Request",
    description: "Send MUSD to anyone instantly. Split bills, pay friends, or send MUSD home - all in seconds.",
    features: ["Zero fees", "Instant delivery", "Request payments"]
  },
  {
    icon: remittanceIcon,
    title: "International",
    description: "Send MUSD across borders without the high fees. Best exchange rates, guaranteed.",
    features: ["190+ countries", "Real-time tracking", "Lower than banks"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Simple Financial Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your MUSD, without the complexity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-xl)] transition-all duration-500 hover:-translate-y-3 border-border/50 bg-card animate-fade-up hover:border-accent/20"
              style={{
                animationDelay: `${index * 150}ms`,
                opacity: 0,
                animationFillMode: 'forwards'
              }}
            >
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 group-hover:shadow-[var(--shadow-accent)]">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-12 h-12 object-contain group-hover:animate-float"
                  />
                </div>

                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-card-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent group-hover:scale-150 transition-transform duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
