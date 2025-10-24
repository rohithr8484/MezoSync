import { PiggyBank, Zap, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const UseCases = () => {
  const useCases = [
    {
      icon: PiggyBank,
      title: "High-Yield Savings",
      description: "Earn 4.5% APY on your MUSD savings with no minimum balance required. Your money works for you while staying accessible whenever you need it."
    },
    {
      icon: Zap,
      title: "Instant Payments",
      description: "Send money to friends, family, or businesses instantly with zero transaction fees. No delays, no hidden costs - just simple, fast payments."
    },
    {
      icon: Globe,
      title: "International Remittances",
      description: "Send money globally without high fees or long wait times. Help your loved ones anywhere in the world with affordable, instant transfers."
    }
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
            Use Cases
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real financial services for everyday needs - no crypto knowledge required
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card
              key={index}
              className="group hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 animate-fade-in bg-card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <useCase.icon className="w-8 h-8 text-accent" />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
