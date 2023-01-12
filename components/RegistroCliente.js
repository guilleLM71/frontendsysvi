import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import { useUser } from '../context/usercontext';

function RegistrarCliente({render}) {
    const {user}=useUser()
    const [cliente,setCliente]=useState({
        dni:"",
        nombre:"",
        telefono:"",
        direccion:"",

    })

    const handleChange = ( {  target: { name, value } }) => 
    { 
            setCliente({ ...cliente, [name]: value });
            
    }
    useEffect(()=>{
        //console.log('usuario :>> ', usuario);
    },[])
    
    async function guardarcliente(event){
        event.preventDefault();
        //const p = md5("admin")
           await axios.post(`http://localhost:4000/api/clientes/crearcliente`, {
                dni:cliente.dni,
                nombre:cliente.nombre,
                telefono:cliente.telefono,
                direccion:cliente.direccion,
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
                        <label for="dni">CI</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese CI" 
                        name="dni" 
                        value={cliente.dni}
                        onChange={handleChange}
                        id="dni"/>
                    </div>
                    <div className="my-1">
                        <label for="nombre">Nombre</label>
                        <input 
                        type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Nombre" 
                        name="nombre" 
                        value={cliente.nombre}
                        onChange={handleChange}
                        id="nombre"/>
                    </div>
                    
                    <div className="my-1">
                        <label for="Telefono">Telefono</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Telefono" 
                        name="telefono"  
                        value={cliente.telefono}
                        onChange={handleChange}
                        id="telefono"/>
                    </div>
                    <div className="my-1">
                        <label for="direccion">Direccion</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese Direccion" 
                        name="direccion" 
                        value={cliente.direccion}
                        onChange={handleChange}
                        id="direccion"/>
                    </div>
                   
                    <input 
                    onClick={guardarcliente} 
                    value="Guardar cliente" 
                    className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                </form>
            </div>
        </div>
    
    
    </div>
    );
}

export default RegistrarCliente;
