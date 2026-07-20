import { useEffect } from "react";
import { useAirlineStore } from "@/presentation/store/airline.store";

export default function AirlinesPage() {
  const { airlines, loadAirlines, isLoading } = useAirlineStore();

  useEffect(() => {
    loadAirlines();
  }, []);

  return (
    <div className="container mx-auto space-y-6 px-6 py-10">
      <div>
        <h1 className="font-serif text-2xl font-bold">Aerolíneas</h1>
        <p className="text-muted-foreground">Gestión de aerolíneas registradas</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#F5A524] border-t-transparent" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="p-3 text-left font-semibold">Nombre</th>
                <th className="p-3 text-left font-semibold">País</th>
              </tr>
            </thead>
            <tbody>
              {airlines.map((airline) => (
                <tr key={airline.id_aerolinea} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-3">{airline.nombre}</td>
                  <td className="p-3">{airline.pais}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}