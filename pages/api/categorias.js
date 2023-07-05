import { Categoria } from "@/models/Categoria";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    const categorias = await Categoria.find().populate("categoriaPadre");
    res.json(categorias);
  }

  if (method === "POST") {
    const { nombre, categoriaPadre, propiedades } = req.body;
    const categoriaDoc = await Categoria.create({
      nombre,
      categoriaPadre: categoriaPadre || undefined,
      propiedades,
    });
    res.json(categoriaDoc);
  }

  if (method === "PUT") {
    const { nombre, categoriaPadre, propiedades, _id } = req.body;
    const categoriaDoc = await Categoria.updateOne(
      { _id },
      { nombre, categoriaPadre: categoriaPadre || undefined, propiedades }
    );
    res.json(categoriaDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Categoria.deleteOne({ _id });
    res.json(true);
  }
}
