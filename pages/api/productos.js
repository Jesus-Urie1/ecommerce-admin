import { Producto } from "@/models/Producto";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Producto.findOne({ _id: req.query.id }));
    } else {
      res.json(await Producto.find());
    }
  }

  if (method === "POST") {
    const { titulo, descripcion, precio, imagenes } = req.body;
    const productoDoc = await Producto.create({
      titulo,
      descripcion,
      precio,
      imagenes,
    });
    res.json(productoDoc);
  }

  if (method === "PUT") {
    const { _id, titulo, descripcion, precio, imagenes } = req.body;
    await Producto.findOneAndUpdate(
      { _id },
      { titulo, descripcion, precio, imagenes }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    const { id } = req.query;
    await Producto.deleteOne({ _id: id });
    res.json(true);
  }
}
