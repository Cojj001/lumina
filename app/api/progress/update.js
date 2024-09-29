// app/api/progress/update.js
import { updateUserProgress } from "../../../lib/progress";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, moduleId } = req.body;

    try {
      await updateUserProgress(userId, moduleId);
      res.status(200).json({ message: "Progress updated successfully" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
