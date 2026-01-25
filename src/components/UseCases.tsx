import { Card, CardContent } from "@/components/ui/card";
import savingsIllustration from "@/assets/savings-illustration.png";
import paymentsIllustration from "@/assets/payments-illustration.png";
import remittanceIllustration from "@/assets/remittance-illustration.png";

const UseCases = () => {
  const useCases = [
    {
      image: savingsIllustration,
      title: "High-Yield Savings",
      description: "Earn 4.5% APY on your MUSD savings with no minimum balance required. Your MUSD works for you while staying accessible whenever you need it."
    },
    {
      image: paymentsIllustration,
      title: "Instant Payments",
      description: "Send MUSD to friends, family, or businesses instantly with zero transaction fees. No delays, no hidden costs - just simple, fast payments."
    },
    {
      image: remittanceIllustration,
      title: "International Remittances",
      description: "Send MUSD globally without high fees or long wait times. Help your loved ones anywhere in the world with affordable, instant transfers."
    }
  ];

  return (
    <section className="py-20 bg-card/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl animate-blob" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient">
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
              className="group hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 animate-fade-in bg-card cursor-pointer hover:-translate-y-6 hover:scale-105 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-primary/10 mb-6 group-hover:scale-110 transition-all duration-500 overflow-hidden">
                  <img 
                    src={useCase.image} 
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-500">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-500">
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
