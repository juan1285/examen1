import StudentTable from "app/components/StudentTable";



export default function Home() {
  return (
    <>
      <h1 className="text-4xl text-center mt-8">
        ¿Crees poder lograrlo? Si no confías en ti, ¿quién lo hará?
      </h1>
      <h2 className="text-2xl text-center mt-4">
        Aquí debe de verse tu tabla, ¿cuál tabla? Lee el archivo README
      </h2>

      {/* Tabla de artículos con la capacidad de agregar y eliminar */}
      <StudentTable />
    </>
  );
}
