import mongoose, { Schema, model, models } from "mongoose";

const CategoriaSchema = new Schema({
  nombre: { type: String, required: true },
  categoriaPadre: { type: mongoose.Types.ObjectId },
});

export const Categoria =
  models?.Categoria || model("Categoria", CategoriaSchema);
