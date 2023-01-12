import { pool } from "../../config/dbcon";

export default async function handler(req, res) {
  const results = await pool.query("SELECT NOW()");
  res.status(200).json({ result: results[0]["NOW()"] });
}