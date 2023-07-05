import { mongooseConnect } from "@/lib/mongoose";
import { Orden } from "@/models/Orden";

export default async function handle(req, res) {
  await mongooseConnect();
  res.json(await Orden.find().sort({ createdAt: -1 }));
}
