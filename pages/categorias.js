import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { withSwal } from "react-sweetalert2";
import { set } from "mongoose";

function Categorias({ swal }) {
  const [editedCategoria, setEditedCategoria] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoriaPadre, setCategoriaPadre] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  useEffect(() => {
    getCategorias();
  }, []);

  async function getCategorias() {
    await axios.get("/api/categorias").then((res) => {
      setCategorias(res.data);
    });
  }

  async function guardarCategoria(e) {
    e.preventDefault();
    const data = {
      nombre,
      categoriaPadre,
      propiedades: propiedades.map((p) => ({
        nombre: p.nombre,
        valor: p.valor.split(","),
      })),
    };
    if (editedCategoria) {
      data._id = editedCategoria._id;
      await axios.put("/api/categorias", data);
      setEditedCategoria(null);
    } else {
      await axios.post("/api/categorias", data);
    }

    setNombre("");
    setCategoriaPadre("");
    setPropiedades([]);
    getCategorias();
  }

  function editarCategoria(categoria) {
    setEditedCategoria(categoria);
    setNombre(categoria.nombre);
    setCategoriaPadre(categoria.categoriaPadre?._id);
    setPropiedades(
      categoria.propiedades.map(({ nombre, valor }) => ({
        nombre,
        valor: valor.join(","),
      }))
    );
  }

  function deleteCategoria(categoria) {
    swal
      .fire({
        title: "¿Estas seguro?",
        text: `¿Quieres eliminar la categoria ${categoria.nombre}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true,
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { _id } = categoria;
          await axios.delete("/api/categorias?_id=" + _id);
          swal.fire("Eliminado!", "La categoria ha sido eliminada.", "success");
          getCategorias();
        }
      });
  }

  function agregarPropiedad() {
    setPropiedades((prev) => {
      return [...prev, { nombre: "", valor: "" }];
    });
  }

  function handlePropiedadChange(index, propiedad, newName) {
    setPropiedades((prev) => {
      const propiedades = [...prev];
      propiedades[index].nombre = newName;
      return propiedades;
    });
  }

  function handleValuesChange(index, propiedad, newValues) {
    setPropiedades((prev) => {
      const propiedades = [...prev];
      propiedades[index].valor = newValues;
      return propiedades;
    });
  }

  function removeProperty(indextoRemove) {
    setPropiedades((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indextoRemove;
      });
    });
  }

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>
        {editedCategoria
          ? `Editar Categoria ${editedCategoria.nombre}`
          : "Nueva Categoria"}
      </label>
      <form onSubmit={guardarCategoria}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Nombre"
            onChange={(e) => setNombre(e.target.value)}
            value={nombre}
          />
          <select
            onChange={(e) => setCategoriaPadre(e.target.value)}
            value={categoriaPadre}
          >
            <option value="">Sin Categoria</option>
            {categorias.length > 0 &&
              categorias.map((categoria) => (
                <option key={categoria._id} value={categoria._id}>
                  {categoria.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Propiedades</label>
          <button
            onClick={agregarPropiedad}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Agregar propiedad
          </button>
          {propiedades.length > 0 &&
            propiedades.map((propiedad, index) => (
              <div className="flex gap-1 mb-2" key={index}>
                <input
                  type="text"
                  value={propiedad.nombre}
                  className="mb-0"
                  onChange={(ev) =>
                    handlePropiedadChange(index, propiedad, ev.target.value)
                  }
                  placeholder="Nombre propiedad"
                />
                <input
                  type="text"
                  value={propiedad.valor}
                  className="mb-0"
                  onChange={(ev) =>
                    handleValuesChange(index, propiedad, ev.target.value)
                  }
                  placeholder="Valor propiedad"
                />
                <button
                  onClick={() => removeProperty(index)}
                  type="button"
                  className="btn-red"
                >
                  Eliminar
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategoria && (
            <button
              type="button"
              onClick={() => {
                setEditedCategoria(null);
                setNombre("");
                setCategoriaPadre("");
                setPropiedades([]);
              }}
              className="btn-default"
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Guardar
          </button>
        </div>
      </form>
      {!editedCategoria && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Nombre de la categoria</td>
              <td>Categoria Padre</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 &&
              categorias.map((categoria) => (
                <tr key={categoria._id}>
                  <td>{categoria.nombre}</td>
                  <td>{categoria?.categoriaPadre?.nombre}</td>
                  <td>
                    <button
                      onClick={() => editarCategoria(categoria)}
                      className="btn-default mr-1"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCategoria(categoria)}
                      className="btn-red"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
  <Categorias swal={swal} ref={ref} />
));
