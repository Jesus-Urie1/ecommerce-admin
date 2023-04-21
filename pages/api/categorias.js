import { Categoria } from "@/models/Categoria";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    const categorias = await Categoria.find();
    res.json(categorias);
  }

  if (method === "POST") {
    const { nombre, categoriaPadre } = req.body;
    const categoriaDoc = await Categoria.create({ nombre, categoriaPadre });
    res.json(categoriaDoc);
  }
}
