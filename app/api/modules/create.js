// app/api/modules/create.js
import { addNewModule } from "../../../lib/modules";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const module = req.body;

    try {
      const moduleId = await addNewModule(module);
      res.status(200).json({ moduleId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
