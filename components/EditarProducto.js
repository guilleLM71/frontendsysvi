import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditarProducto({render,cod}) {
    const [producto,setProducto]=useState({
        descripcion:"",
        proveedor:"",
        precio:"",
    })
    const [proveedores,setProveedores]=useState([])
    const handleChange = ( {  target: { name, value } }) => 
    {   
            setProducto({ ...producto, [name]: value });
            
    }
    useEffect(()=>{
        getproductoid()
        getproveedores()
        console.log('producto :>> ', producto);
    },[])
    async function getproductoid(){     
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/producto/getproductoid', 
           {
            codproducto:cod
           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                setProducto({...res.data.user})
               
     
              }).catch((error)=>{
         
                   console.log(error)
              })
    }


    async function editproducto(event){   
        event.preventDefault()  
       // debugger
        console.log('producto :>> ', producto);
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/producto/editproducto', 
           {
            proveedor:producto.proveedor,
            descripcion:producto.descripcion,
            precio:producto.precio,
            codproducto:cod

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
                    title: error,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                   console.log(error)
              })
              
    }
    async function getproveedores(){     
        //const p = md5("admin")
           await axios.get('http://localhost:4000/api/proveedor', 
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                //console.log(res)
                setProveedores(res.data)
               // console.log(roles)
     
              }).catch((error)=>{
         
                console.log('error :>> ', error);
              })
    }
    return (
        <div className="container">

        
<div className="grid grid-cols-1">
                <form action="" method="post" autocomplete="off">
                    
                    <div className="my-1">
                        <label>Proveedor</label>
                        <select 
                        name="proveedor" 
                        id="proveedor" 
                        onChange={handleChange}
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                           <option value={producto.proveedor} selected>{producto.proveedor}</option>
                            {                            
                            proveedores.map((proveedor)=>{
                                return (
                                    <option  
                                    value={proveedor.codproveedor}>
                                    {proveedor.proveedor}
                                    </option>
                                )                            
                            })
                            }
                        </select>
                        </div>
                    
                    
                    <div className="my-1">
                        <label for="descripcion">Producto</label>
                        <input type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese el nombre del producto" 
                        name="descripcion" 
                        value={producto.descripcion}
                        onChange={handleChange}
                        id="descripcion"/>
                    </div>
                    <div className="my-1">
                        <label for="precio">Precio</label>
                        <input 
                        type="text" 
                        className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        placeholder="Ingrese el precio" 
                        name="precio" 
                        value={producto.precio}
                        onChange={handleChange}
                        id="precio"/>
                    </div>
                    
                                  
                    <input 
                    onClick={editproducto} 
                    value="Guardar producto" 
                    className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                </form>
            </div>

    </div>
    );
}

export default EditarProducto;