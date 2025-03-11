"use client";

import { useEffect, useState } from "react";
import { getExamenData, updateExamenItem, deleteExamenItem } from "../lib/api";

/* Acá hay un error aproposito descubrelo */
export default function studenTable() {
  const [datos, setDatos] = useState<
    { id: number; nombre: string; completado: boolean }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getExamenData();
        setDatos(data);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    }
    fetchData();
  }, []);

  const toggleCompletado = async (id: number, completado: boolean) => {
    try {
      await updateExamenItem(id, !completado);
      setDatos(
        datos.map((item) =>
          item.id === id ? { ...item, completado: !completado } : item
        )
      );
    } catch (error) {
      console.error("Error actualizando:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteExamenItem(id);
      setDatos(datos.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Lista de Tareas</h2>
      <table className="w-full border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">Nombre</th>
            <th className="p-2">Completado</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="p-2">{item.nombre}</td>
              <td className="p-2">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={item.completado}
                    onChange={() => toggleCompletado(item.id, item.completado)}
                  />
                  <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
