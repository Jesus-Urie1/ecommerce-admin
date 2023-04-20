import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import ProductoForm from "@/components/ProductoForm";

export default function EditarProducto() {
  const [productoInfo, setProductoInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/productos?id=" + id).then((res) => {
      setProductoInfo(res.data);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Editar Producto</h1>
      {productoInfo && <ProductoForm {...productoInfo} />}
    </Layout>
  );
}
