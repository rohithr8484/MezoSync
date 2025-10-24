import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 44, 68, 0.95), rgba(26, 44, 68, 0.92)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/40 backdrop-blur-sm mb-4 animate-fade-in shadow-[var(--shadow-accent)]">
            <Shield className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-accent">Mezo Network-Backed Financial Freedom</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight animate-fade-up">
            Your MUSD, Simplified.
            <span className="block mt-2 bg-[image:var(--gradient-accent)] bg-clip-text text-transparent animate-glow">Powered by Mezo Network</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            Send, save, and manage your MUSD like any banking app. No crypto knowledge needed. Just simple, secure financial freedom.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-fade-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]">
            <Link to="/wallet">
              <Button variant="hero" size="xl" className="group animate-glow">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl">
              <Zap className="w-5 h-5" />
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto animate-fade-up [animation-delay:600ms] opacity-0 [animation-fill-mode:forwards]">
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-110 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)]">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">Instant</div>
              <div className="text-sm text-muted-foreground font-medium">Transfers</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-110 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)]">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">$0</div>
              <div className="text-sm text-muted-foreground font-medium">Monthly Fees</div>
            </div>
            <div className="text-center space-y-2 p-4 rounded-xl bg-accent/5 border border-accent/20 hover:scale-110 hover:bg-accent/10 transition-all duration-300 hover:shadow-[var(--shadow-accent)]">
              <div className="text-3xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">4.5%</div>
              <div className="text-sm text-muted-foreground font-medium">Savings APY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
