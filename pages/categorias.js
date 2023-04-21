import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

export default function Categorias() {
  const [nombre, setNombre] = useState("");
  const [categoriaPadre, setCategoriaPadre] = useState("");
  const [categorias, setCategorias] = useState([]);

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
    await axios.post("/api/categorias", { nombre, categoriaPadre });
    setNombre("");
    getCategorias();
  }

  return (
    <Layout>
      <h1>Categorias</h1>
      <label>Nombre Categoria</label>
      <form onSubmit={guardarCategoria} className="flex gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Nombre"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}
        />
        <select
          className="mb-0"
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
        <button type="submit" className="btn-primary py-1">
          Guardar
        </button>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Nombre de la categoria</td>
          </tr>
        </thead>
        <tbody>
          {categorias.length > 0 &&
            categorias.map((categoria) => (
              <tr key={categoria._id}>
                <td>{categoria.nombre}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
