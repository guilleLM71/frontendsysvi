import React, { useEffect, useState } from "react";
import Router, { useRouter } from 'next/router'

import axios from "axios";
import md5 from "blueimp-md5";

function Login() {

  const [usuario,setUsuario]=useState({user:"",con:""})
  const [token,setToken]=useState("")
  const handleChange = ( {  target: { name, value } }) => 
  { 
          setUsuario({ ...usuario, [name]: value });
          
  }

  useEffect(()=>{console.log(usuario)},[usuario])
  const router = useRouter();
  const Login = async (event)=>{   
    
    event.preventDefault();
    //const p = md5("admin")
    //console.log(`${process.env.API}/api/auth/login`);
       await axios.post(`http://localhost:4000/api/auth/login`, {
            usuario:usuario.user,
            contraseña:usuario.con
          }).then((res)=>{
            localStorage.setItem('token', res.data.token);
            setToken(res.data.token)
            router.push('/Dashboard')
          }).catch((error)=>{
            console.log('error :>> ', error);
       
          })
        
      
          
      
    
  }


  return (

      <div className="flex flex-row justify-center items-center h-screen bg-gradient-to-t from-cyan-500 to-blue-500 ">
        <div className=" col-start-1 col-span-4 ">
          <div className="bg-slate-100 rounded-xl shadow-md  md:max-w-2xl my-5">
            <div className="flex flex-row justify-center items-center">
            <div className="">
                <img src="https://i.postimg.cc/bY5R9Jwt/Logo-Marca-Personal-Minimalista-Elegante-y-Org-nico-Blanco-y-Negro.png" className="w-60 h-60"/>
              </div>
              <div className="grid grid-cols-1">
                <div className="p-5">
                  <div className="text-center">
                    <h4 className="text-gray-900 mb-4">Iniciar Sesión</h4>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-3">
                    <div className="form-group">
                      <label className="mr-5">Usuario</label>
                      <input
                        type="text"
                        value={usuario.user}   
                        name="user" 
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Usuario"
                      />
                    </div>
                    <div className="form-group">
                      <label className="mr-5">Contraseña</label>
                      <input
                        type="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Contraseña"
                        value={usuario.con}   
                        name="con" 
                        onChange={handleChange}
                      />
                    </div>
                    <button
                      
                      onClick={Login}
                      className="bg-blue-500 hover:bg-blue-400 text-white font-bold my-5  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                    >Iniciar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  );
}

export default Login;
