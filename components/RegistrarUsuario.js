import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
function RegistrarUsuario({render}) {

    const [usuario,setUsuario]=useState({
        nombre:"",
        correo:"",
        usuario:"",
        clave:"",
        rol:"",
    })
    const [roles,setRoles]=useState([])
    const [token,setToken]=useState("")
    const handleChange = ( {  target: { name, value } }) => 
    { 
            setUsuario({ ...usuario, [name]: value });
            
    }
    useEffect(()=>{
        getRoles()
        //console.log('usuario :>> ', usuario);
    },[])
    async function getRoles(){     
        //const p = md5("admin")
           await axios.get('http://localhost:4000/api/users/getroles', 
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                setRoles(res.data.rolesdb)
               // console.log(roles)
     
              }).catch((error)=>{
         
           
              })
    }

    async function guardarusuario(event){
        event.preventDefault();
        //const p = md5("admin")
           await axios.post(`http://localhost:4000/api/users/crearusuario`, {
                nombre:usuario.nombre,
                correo:usuario.correo,
                usuario:usuario.usuario,
                clave:usuario.clave,
                rol:usuario.rol

              },
              { headers: { "xx-token": localStorage.getItem('token')} }
              ).then((res)=>{
                Swal.fire({
                    title: res.data.msg,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  })

                
              }).catch((error)=>{
                //console.log('error :>> ', error);
                Swal.fire({
                    title: res.data.msg,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  })

              })

            render()
    }
    return (
        <div className="container text-black">
 
        <div className="flex flex-col items-center justify-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">Panel de Administración</h1>
        </div>

        <div className="flex flex-row">
            <div className="grid grid-cols-1">
                <form action="" method="post" autocomplete="off">
                    <div className="my-1">
                        <label for="nombre">Nombre</label>
                        <input 
                        type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Nombre" 
                        name="nombre" 
                        value={usuario.nombre}
                        onChange={handleChange}
                        id="nombre"/>
                    </div>
                    <div className="my-1">
                        <label for="correo">Correo</label>
                        <input type="email" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Correo Electrónico" 
                        name="correo" 
                        value={usuario.correo}
                        onChange={handleChange}
                        id="correo"/>
                    </div>
                    <div className="my-1">
                        <label for="usuario">Usuario</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Usuario" 
                        name="usuario" 
                        value={usuario.usuario}
                        onChange={handleChange}
                        id="usuario"/>
                    </div>
                    <div className="my-1">
                        <label for="clave">Contraseña</label>
                        <input type="password" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Contraseña" 
                        name="clave" 
                        value={usuario.clave}
                        onChange={handleChange}
                        id="clave"/>
                    </div>
                    <div className="my-1">
                        <label>Rol</label>
                        <select 
                        name="rol"
                        id="rol" 
                        onChange={handleChange}
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            {                            
                            roles.map((rol)=>{
                                return (
                                    <option 
                                    value={rol.idrol}>
                                    {rol.rol}
                                    </option>
                                )                            
                            })
                            }
                        </select>
                        </div>
                    <input 
                    onClick={guardarusuario} 
                    value="Guardar Usuario" 
                    className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                </form>
            </div>
        </div>
    
    
    </div>
    );
}

export default RegistrarUsuario;
