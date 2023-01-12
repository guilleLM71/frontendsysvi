/*
import { pool } from "../../../config/dbcon";
import bcrypt from 'bcrypt';
const md5 = require('md5')
import { generateJsonWebToken } from '../../../config/jwtoken';
import { serialize } from "cookie";
export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await login(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const login = async (req, res) => {

try{
  const { usuario,contraseña } = req.body;

  //console.log('contraseña :>> ', contraseña);

  const validausuario = await pool.query('SELECT usuario FROM usuario WHERE usuario = ?', [ usuario ]);

  //console.log(validausuario)
  if( validausuario.length === 0 ){
      return res.status(400).json({
          resp: false,
          msg : 'No existe este usuario'
      });
  }
 
  const pass= md5(contraseña)
  //console.log(pass)
  const userdb = await pool.query("select u.idusuario,  u.nombre,  u.correo, u.usuario, u.clave, r.idrol, r.rol FROM  usuario u INNER JOIN rol r ON u.rol = r.idrol WHERE u.usuario = ? AND u.clave = ?", [
    usuario,
    pass
  ])


  //console.log('userdb :>> ', userdb);
  const user = userdb[0];
  console.log(user)

  let token = await generateJsonWebToken( user.idusuario );

  if( pass==user.clave){
     

      const serialized = serialize("myTokenName", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
    
      res.setHeader("Set-Cookie", serialized);
      return res.status(200).json({
        resp: true,
        msg : 'Welcome ',
        user: {
            idusuario: user.idusuario,
            nombre: user.nombre,
            correo: user.correo,
            usuario: user.usuario,
            rol: user.rol
    
        },
        token:token
    
    });


  }else{
    return res.status(401).json({
      resp: false,
      msg : 'Constraseña incorrecta'
  }); 

  

  }
  

  


  

} catch (e) {
  return res.status(500).json({
      resp: false,
      msg : e
  });
}






 
};
*/