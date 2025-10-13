import { Button } from "@/components/ui/button";
import { Bitcoin, Wallet, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";

const Navigation = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
              <Bitcoin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">BitBank</span>
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
