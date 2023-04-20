import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EliminarProducto() {
  const router = useRouter();
  const [productoInfo, setProductoInfo] = useState(null);
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/productos?id=" + id).then((res) => {
      setProductoInfo(res.data);
    });
  }, [id]);

  function goBack() {
    router.push("/productos");
  }

  async function eliminarProducto() {
    await axios.delete("/api/productos?id=" + id);
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Quiere eliminar el producto {productoInfo?.titulo}?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={eliminarProducto}>
          Si
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
