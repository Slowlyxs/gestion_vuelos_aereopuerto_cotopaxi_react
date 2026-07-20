// src/presentation/pages/splash/SplashPage.tsx

import loadingGif from "@/assets/gifs/loading.gif";

export default function SplashPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <img src={loadingGif} alt="Cargando..." className="h-44 w-44 object-contain" />

      <h1 className="mt-8 text-3xl font-bold">Cotopaxi Airlines</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Preparando tu vuelo...
      </p>
    </div>
  );
}