import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-primary via-primary to-purple-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent animate-pulse-slow" />
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40 animate-blob" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float [animation-delay:1.5s]" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/40 backdrop-blur-sm animate-scale-in hover:scale-110 transition-all duration-300 animate-glow-pulse cursor-pointer">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Start Your Journey Today</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight animate-fade-up hover:scale-105 transition-transform duration-500">
            Ready to Take Control of Your Financial Future?
          </h2>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Join thousands who've already discovered the freedom of Bitcoin-backed banking. No credit checks, no waiting periods, no complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Button variant="hero" size="xl" className="group animate-glow hover:scale-110 transition-all duration-500 shadow-[var(--shadow-glow)]">
              Open Your Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button variant="heroOutline" size="xl" className="hover:scale-110 transition-all duration-500 hover:shadow-[var(--shadow-accent)]">
              Talk to an Expert
            </Button>
          </div>

          <div className="pt-8 text-sm text-muted-foreground animate-fade-in [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            Account setup takes less than 3 minutes • No minimum deposit required
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
    </section>
  );
};

export default CTA;
