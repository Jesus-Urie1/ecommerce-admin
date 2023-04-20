import { Schema, model, models } from "mongoose";

const ProductoSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
  imagenes: [{ type: String }],
});

export const Producto = models.Producto || model("Producto", ProductoSchema);
