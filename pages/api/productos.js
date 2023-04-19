import { Producto } from "@/models/Producto";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === "POST") {
    const { titulo, descripcion, precio } = req.body;
    const productoDoc = await Producto.create({ titulo, descripcion, precio });
    res.json(productoDoc);
  }
}
