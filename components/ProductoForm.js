import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductoForm({
  _id,
  titulo: existingTitle,
  descripcion: existingDescription,
  precio: existingPrice,
  imagenes: existingImages,
}) {
  const [titulo, setTitulo] = useState(existingTitle || "");
  const [descripcion, setDescripcion] = useState(existingDescription || "");
  const [precio, setPrecio] = useState(existingPrice || "");
  const [imagenes, setImagenes] = useState(existingImages || []);
  const [obtenerProductos, setObtenerProductos] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  async function crearProducto(e) {
    e.preventDefault();
    const data = { titulo, descripcion, precio, imagenes };
    if (_id) {
      // update
      await axios.put("/api/productos", { ...data, _id });
    } else {
      // create
      await axios.post("/api/productos", data);
    }
    setObtenerProductos(true);
  }

  if (obtenerProductos) {
    router.push("/productos");
  }

  async function subirImagen(e) {
    const files = e.target?.files;
    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImagenes((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }

  function updateImagesOrder(images) {
    setImagenes(images);
  }
  return (
    <form onSubmit={crearProducto}>
      <label>Nombre del Producto</label>
      <input
        type="text"
        placeholder="nombre del producto"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <label>Fotos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={imagenes}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!imagenes?.length &&
            imagenes.map((link) => (
              <div key={link} className="h-24">
                <img src={link} alt="" className="rounded-lg" />
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label
          className="w-24 h-24 cursor-pointer 
        text-center flex text-sm gap-1 text-gray-500 rounded-lg
         bg-gray-200 items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>

          <input type="file" className="hidden" onChange={subirImagen} />
        </label>
      </div>

      <label>Descripción</label>
      <textarea
        placeholder="descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <label>Precio</label>
      <input
        type="number"
        placeholder="precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <button type="submit" className="btn-primary">
        Guardar
      </button>
    </form>
  );
}
