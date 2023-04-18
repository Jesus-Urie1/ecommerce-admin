import Layout from "@/components/Layout";
import Link from "next/link";

export default function Productos() {
  return (
    <Layout>
      <Link
        href={"/productos/nuevo"}
        className="bg-blue-900 text-white rounded-md py-1 px-2"
      >
        Agregar Producto
      </Link>
    </Layout>
  );
}
