import { Schema, model } from "mongoose";

const ProductoSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: String,
  precio: { type: Number, required: true },
});

export const Producto = model("Producto", ProductoSchema);
