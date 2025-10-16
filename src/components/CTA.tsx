import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary via-primary to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight">
            Ready to Take Control of Your Financial Future?
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands who've already discovered the freedom of Bitcoin-backed banking. No credit checks, no waiting periods, no complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="xl" className="group">
              Open Your Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl">
              Talk to an Expert
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground">
            Account setup takes less than 3 minutes • No minimum deposit required
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default CTA;
