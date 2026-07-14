import { Outlet, Link } from "react-router-dom";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">

          <Link
            to="/"
            className="text-xl font-bold"
          >
            Cotopaxi Airlines
          </Link>


          <nav className="flex items-center gap-6">

            <Link
              to="/"
              className="text-sm hover:text-primary"
            >
              Inicio
            </Link>


            <Link
              to="/vuelos"
              className="text-sm hover:text-primary"
            >
              Vuelos
            </Link>


            <Link
              to="/aerolineas"
              className="text-sm hover:text-primary"
            >
              Aerolíneas
            </Link>


            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm text-white"
            >
              Ingresar
            </Link>

          </nav>

        </div>
      </header>


      {/* Contenido dinámico */}
      <main className="flex-1">
        <Outlet />
      </main>


      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">

        © {new Date().getFullYear()} Cotopaxi Airlines

      </footer>


    </div>
  );
}