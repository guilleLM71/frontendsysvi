import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useUser } from '../context/usercontext';

function RegistroProveedor({render}) {

    const {user}=useUser()
    const [proveedor,setProveedor]=useState({
        codproveedor:"",
        proveedor:"",
        contacto:"",
        telefono:"",
        direccion:"",

    })
    const [token,setToken]=useState("")
    const handleChange = ( {  target: { name, value } }) => 
    { 
            setProveedor({ ...proveedor, [name]: value });
            
    }
    useEffect(()=>{
        //console.log('usuario :>> ', usuario);
    },[])
    
    async function guardarproveedor(event){
        event.preventDefault();
        //const p = md5("admin")
           await axios.post(`http://localhost:4000/api/proveedor/crearproveedor`, {
                proveedor:proveedor.proveedor,
                contacto:proveedor.contacto,
                telefono:proveedor.telefono,
                direccion:proveedor.direccion,
                idusuario:user.idusuario
    

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
                    {}
                    <div className="my-1">
                        <label for="proveedor">Proveedor</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese el proveedor" 
                        name="proveedor" 
                        value={proveedor.proveedor}
                        onChange={handleChange}
                        id="proveedor"/>
                    </div>
                    <div className="my-1">
                        <label for="contacto">Contacto</label>
                        <input 
                        type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Contacto" 
                        name="contacto" 
                        value={proveedor.contacto}
                        onChange={handleChange}
                        id="contacto"/>
                    </div>
                    
                    <div className="my-1">
                        <label for="Telefono">Telefono</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Telefono" 
                        name="telefono"  
                        value={proveedor.telefono}
                        onChange={handleChange}
                        id="telefono"/>
                    </div>
                    <div className="my-1">
                        <label for="direccion">Direccion</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Direccion" 
                        name="direccion" 
                        value={proveedor.direccion}
                        onChange={handleChange}
                        id="direccion"/>
                    </div>
                   
                    <input 
                    onClick={guardarproveedor} 
                    value="Guardar proveedor" 
                    className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                </form>
            </div>
        </div>
    
    
    </div>
    );
}

export default RegistroProveedor;