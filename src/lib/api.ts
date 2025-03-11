export const getExamenData = async () => {
  const res = await fetch("/api/students", { cache: "no-store" });
  if (!res.ok) throw new Error("Error al obtener los datos");
  return res.json();
};

export const addExamenItem = async (nombre: string) => {
  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre }),
  });
  return res.json();
};

export const updateExamenItem = async (id: number, completado: boolean) => {
  const res = await fetch("/api/students", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, completado }),
  });
  return res.json();
};

export const deleteExamenItem = async (id: number) => {
  /* Aquí hay un error aproposito, espero lo sepas solucionar */
  await fetch("/api/examen", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
};
