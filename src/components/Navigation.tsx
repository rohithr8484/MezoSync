import { Button } from "@/components/ui/button";
import { Wallet, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import mezoLogo from "@/assets/mezo-sync-logo.png";

const Navigation = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <img src={mezoLogo} alt="Mezo Sync" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">Mezo Sync</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="/#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Services
            </a>
            <a href="/#security" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Security
            </a>
            {isConnected && (
              <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <Link to="/dashboard">
                <Button variant="default" size="sm" className="gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/wallet">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Wallet className="w-4 h-4" />
                    Connect
                  </Button>
                </Link>
                <Link to="/wallet">
                  <Button variant="default" size="sm">
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
