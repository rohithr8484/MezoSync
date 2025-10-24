import { Button } from "@/components/ui/button";
import { Wallet, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import mezoLogo from "@/assets/mezo-sync-logo-v2.png";

const Navigation = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg shadow-[var(--shadow-md)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-[var(--shadow-accent)]">
              <img src={mezoLogo} alt="Mezo Sync" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold bg-[image:var(--gradient-accent)] bg-clip-text text-transparent animate-gradient group-hover:scale-110 transition-transform duration-300">Mezo Sync</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#services" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Services
            </a>
            <a href="/#security" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Security
            </a>
            {isConnected && (
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-accent hover:scale-110 transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <Link to="/dashboard">
                <Button variant="default" size="sm" className="gap-2 hover:scale-110 hover:shadow-[var(--shadow-accent)] transition-all duration-300">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/wallet">
                  <Button variant="ghost" size="sm" className="gap-2 hover:scale-110 transition-all duration-300">
                    <Wallet className="w-4 h-4" />
                    Connect
                  </Button>
                </Link>
                <Link to="/wallet">
                  <Button variant="default" size="sm" className="hover:scale-110 hover:shadow-[var(--shadow-glow)] transition-all duration-300 animate-glow">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
