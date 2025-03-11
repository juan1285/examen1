import { NextResponse } from "next/server";

// Datos de ejemplo
let datos = [
  { id: 1, nombre: "Tarea 1", completado: false },
  { id: 2, nombre: "Tarea 2", completado: true },
  { id: 3, nombre: "Tarea 3", completado: false },
  { id: 4, nombre: "Tarea 4", completado: true },
  { id: 5, nombre: "Tarea 5", completado: false },
];

// Cambiar la función GET para que sea compatible con el sistema de rutas dinámicas de Next.js 13
export async function GET(req: Request) {
  // Accede a los parámetros de la ruta usando req.url
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Extrae el parámetro 'id' de la URL
  
  if (id) {
    // Busca el dato correspondiente por ID
    const item = datos.find((data) => data.id === parseInt(id));
    
    if (item) {
      return NextResponse.json(item);
    } else {
      return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
    }
  } else {
    return NextResponse.json({ error: "ID no proporcionado" }, { status: 400 });
  }
}

export async function POST(req: Request) {
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

export async function PUT(req: Request) {
  const body = await req.json();
  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Elemento no encontrado" },
      { status: 404 }
    );
  }

  datos[index] = { ...datos[index], ...body };

  return NextResponse.json(datos[index]);
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }
  
  datos = datos.filter((item) => item.id !== body.id);
  return NextResponse.json({ message: "Elemento eliminado" });
}
