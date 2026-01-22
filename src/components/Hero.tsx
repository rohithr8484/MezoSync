import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[hsl(var(--primary))]"
    >
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-60 animate-blob" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent animate-pulse-slow" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float [animation-delay:1s]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/40 backdrop-blur-sm mb-4 animate-fade-in shadow-[var(--shadow-accent)] hover:scale-105 transition-transform duration-300 animate-glow-pulse">
            <Shield className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Mezo Network-Backed Financial Freedom</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight animate-fade-up hover:scale-105 transition-transform duration-500">
            Your MUSD, Simplified.
            <span className="block mt-2 bg-[image:var(--gradient-accent)] bg-clip-text text-transparent animate-glow animate-gradient">Powered by Mezo Network</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Send, save, and manage your MUSD like any banking app. No crypto knowledge needed. Just simple, secure financial freedom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Link to="/wallet">
              <Button variant="hero" size="xl" className="group animate-glow hover:scale-110 transition-all duration-300 shadow-[var(--shadow-glow)]">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl" className="hover:scale-110 transition-all duration-300 hover:shadow-[var(--shadow-accent)]">
              <Zap className="w-5 h-5 animate-pulse" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-125 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)] cursor-pointer group animate-tilt">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent group-hover:animate-bounce-slow animate-gradient">Instant</div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Transfers</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-125 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)] cursor-pointer group animate-tilt [animation-delay:100ms]">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent group-hover:animate-bounce-slow animate-gradient">$0</div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Monthly Fees</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-125 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)] cursor-pointer group animate-tilt [animation-delay:200ms]">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent group-hover:animate-bounce-slow animate-gradient">4.5%</div>
              <div className="text-sm text-muted-foreground font-medium group-hover:text-foreground transition-colors">Savings APY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
