/*
import jwt from "jsonwebtoken";
import { pool } from "../../../config/dbcon";
export default async function Handler(req, res) {
  const { myTokenName } = req.cookies;
  
  if (!myTokenName) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const { idusuario } = jwt.verify(myTokenName, "secretotoken");
  //console.log('idusuario :>> ', idusuario);

  const userdb = await pool.query("select u.idusuario,  u.nombre,  u.correo, u.usuario, r.rol FROM  usuario u INNER JOIN rol r ON u.rol = r.idrol WHERE u.idusuario = ?", [
    idusuario
  ])
  const user=userdb[0]

  return res.status(200).json({ user});
}*/