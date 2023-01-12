import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useUser } from '../context/usercontext';
function AgregarProducto({render,cod}) {
    const {user}=useUser()

    const [producto,setProducto]=useState({
        descripcion:"",
        proveedor:"",
        precio:"",
        existencia:""
    })

    const [addproducto,setAddproducto]=useState({
        nprecio:"",
        ncantidad:"",
    })

    const handleChangeadd = ( {  target: { name, value } }) => 
    {   
            setAddproducto({ ...addproducto, [name]: value });
            
    }
    const handleChange = ( {  target: { name, value } }) => 
    {   
            setProducto({ ...producto, [name]: value });
            
    }


    
    useEffect(()=>{
        getproductoid()
        console.log('producto :>> ', producto);
        //setAddproducto({...addproducto,[nprecio]:producto.precio})
        //addproducto.nprecio=producto.precio
        console.log('addproducto :>> ', addproducto);
    },[])
    async function getproductoid(){     
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/producto/getproductoid', 
           {
            codproducto:cod
           },
           { headers: { "xx-token": localStorage.getItem('token')} })
           .then((res)=>{
                console.log(res)
                setProducto({...res.data.user})
                addproducto.nprecio=res.data.user.precio
     
              }).catch((error)=>{
         
                   console.log(error)
              })
    }


    async function editproductostock(event){   
        event.preventDefault()  
       // debugger
        console.log('producto :>> ', producto);
        //const p = md5("admin")
           await axios.post('http://localhost:4000/api/producto/editproductostock', 
           {
            nprecio:addproducto.nprecio,
            ncantidad:addproducto.ncantidad,
            codproducto:cod,
            idusuario:user.idusuario

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

    return (
        <div className="container">

        
        <div className="grid grid-cols-1">
                        <form action="" method="post" autocomplete="off">
                          
                                                    
                            
                            <div className="my-1">
                                <label for="descripcion">Producto</label>
                                <input type="text" 
                                disabled
                                className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="descripcion" 
                                value={producto.descripcion}
                                id="descripcion"/>
                            </div>
                            <div className="my-1">
                                <label for="precioa">Precio Actual</label>
                                <input 
                                disabled
                                type="text" 
                                className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="precioa" 
                                value={producto.precio}
                                id="precioa"/>
                            </div>
                            <div className="my-1">
                                <label for="existenciad">Stock Disponible</label>
                                <input 
                                disabled
                                type="text" 
                                className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="existenciad" 
                                value={producto.existencia}
                                id="existenciad"/>
                            </div>
                            <div className="my-1">
                                <label for="nprecio">Nuevo precio?</label>
                                <input 
                                 type="text" 
                                className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                placeholder='Ingrese el nuevo precio si desea'
                                name="nprecio" 
                                value={addproducto.nprecio}
                                onChange={handleChangeadd}
                                id="nprecio"/>
                            </div>
                            <div className="my-1">
                                <label for="ncantidad">Agregar productos</label>
                                <input 
                                 type="text" 
                                className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                name="ncantidad" 
                                placeholder='Ingresese la cantidad que desea agregar'
                                value={addproducto.ncantidad}
                                onChange={handleChangeadd}
                                id="ncantidad"/>
                            </div>
                            
                            
                                          
                            <input 
                            onClick={editproductostock} 
                            value="Actualizar" 
                            className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"/>
                        </form>
                    </div>
        
            </div>
    );
}

export default AgregarProducto;