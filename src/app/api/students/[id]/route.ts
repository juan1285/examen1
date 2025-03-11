import { NextResponse } from "next/server";

// Datos de ejemplo, puedes modificarlo según tu necesidad.
let datos = [
  { id: 1, nombre: "Tarea 1", completado: false },
  { id: 2, nombre: "Tarea 2", completado: true },
  { id: 3, nombre: "Tarea 3", completado: false },
  { id: 4, nombre: "Tarea 4", completado: true },
  { id: 5, nombre: "Tarea 5", completado: false },
];

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Obtener el parámetro `id` desde la ruta
  const id = parseInt(params.id);

  // Buscar el dato correspondiente por ID
  const item = datos.find((data) => data.id === id);

  if (item) {
    // Si el elemento existe, devolverlo como respuesta
    return NextResponse.json(item);
  } else {
    // Si no se encuentra el elemento, devolver un error 404
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  // Validación para asegurarse de que el nombre sea proporcionado
  if (!body.nombre) {
    return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 });
  }

  // Crear un nuevo dato y asignarle un ID único
  const nuevoDato = {
    id: datos.length + 1,
    nombre: body.nombre,
    completado: false,
  };
  
  // Agregar el nuevo dato a la lista
  datos.push(nuevoDato);

  // Devolver el nuevo dato con un código de estado 201 (creado)
  return NextResponse.json(nuevoDato, { status: 201 });
}

export async function PUT(req: Request) {
  const body = await req.json();

  // Buscar el índice del elemento con el ID que queremos actualizar
  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    // Si el elemento no se encuentra, devolver un error 404
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }

  // Actualizar el elemento en el arreglo
  datos[index] = { ...datos[index], ...body };

  // Devolver el elemento actualizado
  return NextResponse.json(datos[index]);
}

export async function DELETE(req: Request) {
  const body = await req.json();

  // Buscar el índice del elemento que queremos eliminar
  const index = datos.findIndex((item) => item.id === body.id);
  if (index === -1) {
    // Si el elemento no se encuentra, devolver un error 404
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 });
  }

  // Eliminar el elemento del arreglo
  datos = datos.filter((item) => item.id !== body.id);

  // Devolver un mensaje indicando que el elemento fue eliminado
  return NextResponse.json({ message: "Elemento eliminado" });
}
