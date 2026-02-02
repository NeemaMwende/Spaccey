import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="absolute top-0 w-full z-50 px-16 py-6 flex items-center justify-between">
      <span className="text-xl font-semibold tracking-widest">SPACEY</span>

      <nav className="flex items-center gap-10 text-sm text-white/80">
        <a className="hover:text-white">Features</a>
        <a className="hover:text-white">Integrations</a>
        <a className="hover:text-white">Security</a>
        <a className="hover:text-white">Pricing</a>
      </nav>

      <Button variant="outline" className="border-white/40">
        Book Demo
      </Button>
    </header>
  );
}
