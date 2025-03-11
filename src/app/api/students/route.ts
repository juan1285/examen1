import { NextResponse } from "next/server"; 
// Importa el módulo NextResponse desde Next.js, que permite devolver respuestas HTTP.

let datos = [ 
  { id: 1, nombre: "Tarea 1", completado: false }, 
  { id: 2, nombre: "Tarea 2", completado: true }, 
  { id: 3, nombre: "Tarea 3", completado: false }, 
  { id: 4, nombre: "Tarea 4", completado: true }, 
  { id: 5, nombre: "Tarea 5", completado: false }, 
]; 
// Declara un arreglo de objetos "datos", donde cada objeto representa una tarea 
// con tres propiedades: id (identificador único), nombre (nombre de la tarea), y completado (estado de la tarea).

export async function GET() { 
  return NextResponse.json(datos); 
} 
// La función GET devuelve todos los datos (las tareas) en formato JSON como respuesta a una solicitud GET.

export async function POST(req: Request) { 
  const body = await req.json(); 
  // Obtiene el cuerpo de la solicitud (expectativa de que es un JSON) y lo convierte en un objeto JavaScript.

  if (!body.nombre) { 
    return NextResponse.json({ error: "Nombre es requerido" }, { status: 400 }); 
  } 
  // Si el cuerpo de la solicitud no contiene un "nombre", devuelve un error 400 (mala solicitud), indicando que el nombre es obligatorio.

  const nuevoDato = { 
    id: datos.length + 1, 
    nombre: body.nombre, 
    completado: false, 
  }; 
  // Crea un nuevo objeto de tarea con un id único (basado en la longitud del arreglo de datos), 
  // usando el nombre recibido en el cuerpo de la solicitud y asignando completado a falso.

  datos.push(nuevoDato); 
  // Agrega el nuevo objeto "nuevoDato" al arreglo de "datos".

  return NextResponse.json(nuevoDato, { status: 201 }); 
  // Devuelve el objeto recién creado con un estado HTTP 201 (creado exitosamente).
}

export async function PUT(req: Request) { 
  const body = await req.json(); 
  // Obtiene el cuerpo de la solicitud y lo convierte a un objeto JavaScript.

  const index = datos.findIndex((item) => item.id === body.id); 
  // Busca el índice del objeto en "datos" que tenga el mismo id que el del cuerpo de la solicitud.

  if (index === -1) { 
    return NextResponse.json( 
      { error: "Elemento no encontrado" }, 
      { status: 404 } 
    ); 
  } 
  // Si no encuentra el objeto (el índice es -1), devuelve un error 404 (no encontrado).

  datos[index] = { ...datos[index], ...body }; 
  // Si encuentra el objeto, lo actualiza con los valores del cuerpo de la solicitud, 
  // combinando los datos existentes con los nuevos datos enviados en la solicitud.

  return NextResponse.json(datos[index]); 
  // Devuelve el objeto actualizado.
}

export async function DELETE(req: Request) { 
  const body = await req.json(); 
  // Obtiene el cuerpo de la solicitud y lo convierte en un objeto JavaScript.

  const index = datos.findIndex((item) => item.id === body.id); 
  // Busca el índice del objeto en "datos" con el id especificado en el cuerpo de la solicitud.

  if (index === -1) { 
    return NextResponse.json({ error: "Elemento no encontrado" }, { status: 404 }); 
  } 
  // Si no encuentra el objeto (índice -1), devuelve un error 404 (no encontrado).

  datos = datos.filter((item) => item.id !== body.id); 
  // Filtra el arreglo "datos" para eliminar el objeto con el id especificado en la solicitud.

  return NextResponse.json({ message: "Elemento eliminado" }); 
  // Devuelve un mensaje indicando que el elemento fue eliminado exitosamente.
}
