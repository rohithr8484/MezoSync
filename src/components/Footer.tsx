import { Bitcoin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-orange-600 flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">Mezo Sync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple, secure Bitcoin-backed MUSD financial services for everyone.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Mezo Sync. All rights reserved.
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
