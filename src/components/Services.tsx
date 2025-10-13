import { Card, CardContent } from "@/components/ui/card";
import savingsIcon from "@/assets/savings-icon.png";
import paymentsIcon from "@/assets/payments-icon.png";
import remittanceIcon from "@/assets/remittance-icon.png";

const services = [
  {
    icon: savingsIcon,
    title: "Bitcoin Savings",
    description: "Grow your wealth with Bitcoin-backed savings accounts. Earn competitive returns while maintaining full control of your assets.",
    features: ["High yield returns", "Instant withdrawals", "FDIC-style protection"]
  },
  {
    icon: paymentsIcon,
    title: "Instant Payments",
    description: "Send and receive money instantly anywhere in the world. Lightning-fast transactions with minimal fees.",
    features: ["Zero processing fees", "Real-time settlement", "Multi-currency support"]
  },
  {
    icon: remittanceIcon,
    title: "Global Remittance",
    description: "Send money home without the hassle. Lower fees, better rates, and faster delivery than traditional services.",
    features: ["Best exchange rates", "Track in real-time", "Trusted by millions"]
  }
];

const Services = () => {
  return (
    <section className="py-24 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, powerful financial services that work for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card"
            >
              <CardContent className="p-8 space-y-6">
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <img 
                    src={service.icon} 
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>

                <div className="space-y-3 text-center">
                  <h3 className="text-2xl font-bold text-card-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
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
