import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditarCliente({render,id}) { 


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
        getclienteid()
        console.log('Cliente :>> ', cliente);
    },[])
    async function getclienteid(){     
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/clientes/getclienteid', 
           {
            idcliente:id
           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                setCliente({...res.data.user})
               
     
              }).catch((error)=>{
         
                   console.log(error)
              })
    }


    async function editcliente(event){   
        event.preventDefault()  
       // debugger
        console.log('cliente :>> ', cliente);
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/clientes/editcliente', 
           {
            dni:cliente.dni,
            nombre:cliente.nombre,
            telefono:cliente.telefono,
            direccion:cliente.direccion,
            idcliente:id

           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
               // console.log(roles)
               Swal.fire({
                title: res.data.msg,
                icon: 'success',
                confirmButtonText: 'Cerrar'
              })
              render()
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


                    <div className="my-1">
                        <label >CI</label>
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
                    <button  onClick={editcliente}
                        className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        
                        Editar Cliente
                    </button>

            </div>
        </div>


    </div>
);

}
export default EditarCliente;