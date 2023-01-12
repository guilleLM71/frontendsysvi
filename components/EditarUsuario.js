import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditarUsuario({render,id}) { 


    const [usuario,setUsuario]=useState({
        nombre:"",
        correo:"",
        usuario:"",
        rol:"",
    })
    const handleChange = ( {  target: { name, value } }) => 
    { 
            setUsuario({ ...usuario, [name]: value });
            
    }
    useEffect(()=>{
        getuserid()
        //console.log('usuario :>> ', usuario);
    },[])
    async function getuserid(){     
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/users/getuserid', 
           {
            idusuario:id
           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                setUsuario(res.data.user)
               // console.log(roles)
     
              }).catch((error)=>{
         
                   console.log(error)
              })
    }


    async function edituser(){     
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/users/edituser', 
           {
            nombre:usuario.nombre,
            correo:usuario.correo,
            usuario:usuario.usuario,
            rol:usuario.rol,
            idusuario:id

           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                //setUsuario(res.data.user)
               // console.log(roles)
               Swal.fire({
                title: res.data.msg,
                icon: 'success',
                confirmButtonText: 'Cerrar'
              })
              }).catch((error)=>{
                Swal.fire({
                    title: res.data.msg,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                   console.log(error)
              })
    }

return (
    <div className="container">

        <div className="grid grid-cols-1">
            <div className="m-auto">
                <form className="" >

                         <div className="my-1">
                        <label for="nombre">Nombre</label>
                        <input type="text"
                            placeholder="Ingrese nombre"
                            className="my-1 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="nombre"
                            id="nombre"
                            onChange={handleChange}
                            value={usuario.nombre} />

                    </div>
                    <div className="my-1">
                        <label for="correo">Correo</label>
                        <input
                            type="text"
                            placeholder="Ingrese correo"
                            className="my-1  focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="correo"
                            id="correo"
                            onChange={handleChange}
                            value={usuario.correo} />

                    </div>
                    <div className="my-1">
                        <label for="usuario">Usuario</label>
                        <input
                            type="text"
                            placeholder="Ingrese usuario"
                            className="my-1  focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="usuario"
                            id="usuario"
                            onChange={handleChange}
                            value={usuario.usuario} />

                    </div>
                    <div className="my-1">
                        <label for="rol">Rol</label>
                        <select
                         onChange={handleChange}
                            name="rol" id="rol"
                            className="my-1  focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                            <option value={usuario.rol} selected>{usuario.rol}</option>
                            <option value="1">Administrador</option>
                            <option value="2" >Vendedor</option>
                        </select>
                    </div>
                    <button type="submit" onClick={edituser}
                        className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        
                        Editar Usuario
                    </button>
                </form>
            </div>
        </div>


    </div>
);

}
export default EditarUsuario;