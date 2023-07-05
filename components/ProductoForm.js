import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductoForm({
  _id,
  titulo: existingTitle,
  descripcion: existingDescription,
  precio: existingPrice,
  imagenes: existingImages,
  categoria: existingCategory,
  propiedades: existingProperties,
}) {
  const [titulo, setTitulo] = useState(existingTitle || "");
  const [descripcion, setDescripcion] = useState(existingDescription || "");
  const [categoria, setCategoria] = useState(existingCategory || "");
  const [productoPropiedades, setProductoPropiedades] = useState(
    existingProperties || {}
  );
  const [precio, setPrecio] = useState(existingPrice || "");
  const [imagenes, setImagenes] = useState(existingImages || []);
  const [obtenerProductos, setObtenerProductos] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categorias").then((res) => {
      setCategorias(res.data);
    });
  }, []);

  async function crearProducto(e) {
    e.preventDefault();
    const data = {
      titulo,
      descripcion,
      precio,
      imagenes,
      categoria,
      propiedades: productoPropiedades,
    };
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

  function setProductProp(propName, value) {
    setProductoPropiedades((prev) => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propiedadesToFill = [];
  if (categorias.length > 0 && categoria) {
    let catInfo = categorias.find(({ _id }) => _id === categoria);
    propiedadesToFill.push(...catInfo.propiedades);
    while (catInfo?.categoriaPadre?._id) {
      const parentCat = categorias.find(
        ({ _id }) => _id === catInfo?.categoriaPadre?._id
      );
      propiedadesToFill.push(...parentCat.propiedades);
      catInfo = parentCat;
    }
  }

  function alertDeleteImage(link) {
    if (confirm("¿Seguro que quieres eliminar esta imagen?")) {
      setImagenes((oldImages) => {
        return oldImages.filter((l) => l !== link);
      });
    }
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
      <label>Categoria</label>
      <select
        value={categoria}
        onChange={(ev) => setCategoria(ev.target.value)}
      >
        <option value="">Sin Categoria</option>
        {categorias.length > 0 &&
          categorias.map((c) => (
            <option key={c._id} value={c._id}>
              {c.nombre}
            </option>
          ))}
      </select>

      {propiedadesToFill.length > 0 &&
        propiedadesToFill.map((p) => (
          <div key={p.nombre} className="">
            <label>{p.nombre[0].toUpperCase() + p.nombre.substring(1)}</label>
            <div>
              <select
                value={productoPropiedades[p.nombre]}
                onChange={(ev) => setProductProp(p.nombre, ev.target.value)}
              >
                {p.valor.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}

      <label>Fotos</label>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={imagenes}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
        >
          {!!imagenes?.length &&
            imagenes.map((link) => (
              <div
                key={link}
                className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => alertDeleteImage(link)}
              >
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
        text-center flex text-sm gap-1 text-primary rounded-sm
         items-center justify-center bg-white shadow-sm border border-primary"
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
