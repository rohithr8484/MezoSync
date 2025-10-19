import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(26, 44, 68, 0.92), rgba(26, 44, 68, 0.85)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 backdrop-blur-sm mb-4 animate-fade-in">
            <Shield className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Mezo Network-Backed Financial Freedom</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight animate-fade-up">
            Your MUSD, Simplified.
            <span className="bg-gradient-to-r from-accent to-orange-500 bg-clip-text text-transparent"> Powered by Mezo Network</span>
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
            <div className="text-center space-y-1 hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent">Instant</div>
              <div className="text-sm text-muted-foreground">Transfers</div>
            </div>
            <div className="text-center space-y-1 hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent">$0</div>
              <div className="text-sm text-muted-foreground">Monthly Fees</div>
            </div>
            <div className="text-center space-y-1 hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-accent">4.5%</div>
              <div className="text-sm text-muted-foreground">Savings APY</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
