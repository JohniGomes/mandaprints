import { ReactNode } from "react";

export default function PaginaInstitucional({
  titulo,
  children,
}: {
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="text-3xl font-bold text-neutral-900">{titulo}</h1>
      <div className="prose prose-neutral mt-6 max-w-none space-y-4 text-neutral-700">
        {children}
      </div>
    </div>
  );
}
