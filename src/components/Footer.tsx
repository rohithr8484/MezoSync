import mezoLogo from "@/assets/mezo-sync-logo-v2.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <img src={mezoLogo} alt="Mezo Sync" className="w-full h-full object-cover" />
              </div>
              <span className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">Mezo Sync</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Simple, secure Mezo Network-backed MUSD financial services for everyone.
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
