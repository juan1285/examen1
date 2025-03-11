// src/app/api/students/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Datos de ejemplo, puedes modificarlo según tu necesidad.
let datos = [
  { id: 1, nombre: "Tarea 1", completado: false },
  { id: 2, nombre: "Tarea 2", completado: true },
  { id: 3, nombre: "Tarea 3", completado: false },
  { id: 4, nombre: "Tarea 4", completado: true },
  { id: 5, nombre: "Tarea 5", completado: false },
];

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id); // Convertir el parámetro 'id' a número
  if (isNaN(id)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  // Buscar el dato correspondiente por ID
  const item = datos.find((data) => data.id === id);

  if (item) {
    return NextResponse.json(item);
  } else {
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.nombre) {
    return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 });
  }

  const nuevoDato = {
    id: datos.length + 1,
    nombre: body.nombre,
    completado: false,
  };

  datos.push(nuevoDato);

  return NextResponse.json(nuevoDato, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();

  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }

  datos[index] = { ...datos[index], ...body };

  return NextResponse.json(datos[index]);
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();

  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }

  datos = datos.filter((item) => item.id !== body.id);

  return NextResponse.json({ message: "Elemento eliminado" });
}
