interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="rounded-xl border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold">
          {title}
        </h1>

        <p className="mt-2 text-muted-foreground">
          {description ?? "Módulo en construcción"}
        </p>
      </div>
    </div>
  );
}