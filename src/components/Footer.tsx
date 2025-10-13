import { Bitcoin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">BitBank</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple, secure Bitcoin-backed financial services for everyone.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Savings</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Payments</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Remittance</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Business</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Security</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Compliance</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} BitBank. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">Twitter</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-accent transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
