import { useState } from "react";
import axios from "axios";
import Layout from "@/components/Layout";

export default function NuevoProducto() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);

  async function crearProducto(e) {
    e.preventDefault();
    const data = { titulo, descripcion, precio };
    await axios.post("/api/productos", data);
  }
  return (
    <Layout>
      <form onSubmit={crearProducto}>
        <h1>Nuevo Producto</h1>
        <label>Nombre del Producto</label>
        <input
          type="text"
          placeholder="nombre del producto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
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
    </Layout>
  );
}
