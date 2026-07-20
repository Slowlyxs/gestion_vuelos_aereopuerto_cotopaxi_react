import loadingGif from "@/assets/gifs/loading.gif";

export default function SplashPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 text-white">
      <img src={loadingGif} alt="Cargando..." className="h-44 w-44 object-contain" />
      <h1 className="mt-8 font-serif text-3xl font-bold">Cotopaxi Airlines</h1>
      <p className="mt-2 text-sm text-white/50">Preparando tu vuelo...</p>
    </div>
  );
}