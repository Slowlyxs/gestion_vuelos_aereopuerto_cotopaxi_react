import { Outlet, Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/vuelos", label: "Vuelos" },
  { to: "/aerolineas", label: "Aerolíneas" },
  { to: "/informacion", label: "Información" },
  { to: "/contacto", label: "Contacto" },
];

export default function PublicLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-serif text-lg font-bold">
            <span className="text-[#F5A524]">✈</span>
            Cotopaxi Airlines
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => {
              const active = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-xs font-semibold uppercase tracking-widest transition ${
                    active
                      ? "text-[#F5A524]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            to="/login"
            className="rounded-md bg-neutral-950 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-neutral-800"
          >
            Ingresar
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 text-white/70">
        <div className="container mx-auto grid gap-10 px-6 py-14 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-serif text-lg font-bold text-white">
              <span className="text-[#F5A524]">✈</span>
              Cotopaxi Airlines
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Conectando las principales ciudades del Ecuador con seguridad,
              puntualidad y tecnología.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Explorar
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} className="w-fit hover:text-[#F5A524]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
              Contacto
            </p>
            <div className="mt-4 space-y-1.5 text-sm">
              <p>+593 2 123 4567</p>
              <p>contacto@cotopaxiairlines.com</p>
              <p>Aeropuerto Mariscal Sucre, Quito</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="container mx-auto px-6 py-5 text-xs text-white/40">
            © {new Date().getFullYear()} Cotopaxi Airlines · Quito, Ecuador
          </p>
        </div>
      </footer>
    </div>
  );
}