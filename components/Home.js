import React, { useEffect, useState } from 'react';
import { AiOutlineDollar, AiOutlineProfile } from 'react-icons/ai';
import { FiUser,FiUsers } from 'react-icons/fi';
import Link from "next/link";
import axios from 'axios';
import { useUser } from '../context/usercontext';
import Swal from 'sweetalert2';

function Home({usuario}) {

    const {user}=useUser()

    const [datos,setDatos]=useState(
        {usuarios:0, 
        clientes:0, 
        proveedores:0, 
        productos:0, 
        ventas:0}
    )

    const [claves, setClaves]=useState({
        claveactual:"",
        clavenueva:"",
        claveconfirmar:""
    })

    const [empresa,setEmpresa]=useState({
        dni:"",
        nombre:"",
        razon_social:"",
        telefono:"",
        email:"",
        direccion:"",
    })

    const handleChangeClave = ( {  target: { name, value } }) => 
    { 
            setClaves({ ...claves, [name]: value });
            
    }
  
    const handleChangeEmpresa = ( {  target: { name, value } }) => 
    { 
            setEmpresa({ ...empresa, [name]: value });
            
    }

    useEffect(()=>{
        getdatadashboard()
        getconfiguracion()
    },[])
    const isadmin=()=>{
        if(usuario.rol=='Administrador') return true
        else return false
    }
    async function getdatadashboard(){
        await axios.get(`http://localhost:4000/api/users/getdatosdashboard`,
            { headers: { "xx-token": localStorage.getItem('token')} }
       )
       .then((res)=>{
           console.log(res)
            
            //rows.push(res.data)
            setDatos(res.data.datos[0][0])
            //console.log('rows :>> ', rows);
          }).catch((error)=>{
            console.log('error :>> ', error);
       
          })
    }

    async function cambiarcontraseña(event){
        event.preventDefault();
        await axios.post(`http://localhost:4000/api/users/cambiarclave`, {
          

            claveactual:claves.claveactual,
            clavenueva:claves.clavenueva,
            clavenuevaconf:claves.claveconfirmar,
            idusuario:user.idusuario


          },{ headers: { "xx-token": localStorage.getItem('token')} }
          
          
          
          ).then((res)=>{
            console.log('res :>> ', res);
            Swal.fire({
                title: res.data.msg,
                icon: 'success',
                confirmButtonText: 'Cerrar'
              })

          }).catch((error)=>{
            console.log('error :>> ', error);
            Swal.fire({
                title: error,
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
          })
    }
    
    async function getconfiguracion(){
        await axios.get(`http://localhost:4000/api/users/getconfiguracion`,
            { headers: { "xx-token": localStorage.getItem('token')} }
       )
       .then((res)=>{
           console.log(res)
            
            //rows.push(res.data)
            setEmpresa(res.data.config[0])
            //console.log('rows :>> ', rows);
          }).catch((error)=>{
            console.log('error :>> ', error);
       
          })
    }

    async function cambiarconfiguacion(event){
        event.preventDefault();
        await axios.post(`http://localhost:4000/api/users/cambiarconfiguracion`, {
          
            
        nit:empresa.dni,
        nombre:empresa.nombre,
        rs:empresa.razon_social,
        telefono:empresa.telefono,
        email:empresa.email,
        direccion:empresa.direccion,


          },{ headers: { "xx-token": localStorage.getItem('token')} }
          
          
          
          ).then((res)=>{
            console.log('res :>> ', res);
            Swal.fire({
                title: res.data.msg,
                icon: 'success',
                confirmButtonText: 'Cerrar'
              })

              getconfiguracion()

          }).catch((error)=>{
            console.log('error :>> ', error);
            Swal.fire({
                title: error,
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
          })
    }

    return (
<div className="container text-black">
<div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-serif ml-4 mb-4 text-gray-900">Panel de Administración</h1>
</div>

<div className="grid grid-cols-4 gap-2 ">

    <Link href={"/Dashboard/usuarios"} className="" 
    >
        <div className="block max-w-sm px-6  bg-white border border-gray-200 rounded-lg shadow-md hover:bg-slate-200 border-l-sky-500 border-l-4   m-3 h-20 py-2">
            <div className="card-body">
                <div className="flex flex-row justify-between items-center my-2">
                    <div className="w-3/6 mr-2">
                        <div className="text-xs font-bold text-sky-500 uppercase mb-1">
                            Usuarios
                        </div>
                        <div className="h-5 mb-0 font-bold text-gray-800">
                            {datos.usuarios}
                        </div>
                    </div>
                    <div className="w-2/6 flex flex-row justify-center items-center text-center">
                    <FiUser fontSize={45} color={"gray"} ></FiUser>
                    
                    </div>
                </div>
            </div>
        </div>
    </Link>

    <Link href={"/Dashboard/clientes"} className="" 

    >
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-slate-200 border-l-green-400 border-l-4   m-3 h-20 py-2">
            <div className="card-body">
                <div className="flex flex-row justify-between items-center my-2">
                    <div className="w-3/6 mr-2">
                        <div className="text-xs font-bold text-green-400 uppercase mb-1">
                            Clientes</div>
                        <div className="h-5 mb-0 font-bold text-gray-800">
                         {datos.clientes}
                            </div>
                    </div>
                    <div className="w-2/6 flex flex-row justify-center items-center text-center">
                        <FiUsers fontSize={45} color={"gray"} ></FiUsers>
                    </div>
                </div>
            </div>
        </div>
    </Link>

    <Link href={"/Dashboard/productos"} className="" 

    >
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-slate-200 border-l-red-500 border-l-4   m-3 h-20 py-2">
            <div className="card-body">
                <div className="flex flex-row justify-between items-center my-2">
                    <div className="w-3/6 mr-2">
                        <div className="text-xs font-bold text-red-500 uppercase mb-1">
                            Productos
                        </div>
                        <div className="h-5 mb-0 font-bold text-gray-800">
                         { datos.productos}
                            </div>

                    </div>
                    <div className="w-2/6 flex flex-row justify-center items-center text-center">
                       <AiOutlineProfile fontSize={45} color={"gray"} ></AiOutlineProfile>
                    </div>
                </div>
            </div>
        </div>
    </Link>

    <Link href={"/Dashboard/ventas"} className=""
    >
        <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-slate-200 border-l-orange-500 border-l-4   m-3 h-20 py-2">
            <div className="card-body">
                <div className="flex flex-row justify-between items-center my-2">
                    <div className="w-3/6 mr-2">
                        <div className="text-xs font-bold text-orange-400 uppercase mb-1">
                            Ventas
                        </div>
                        <div className="h-5 mb-0 font-bold text-gray-800">
                         { datos.ventas}
                        </div>
                    </div>
                    <div className="w-2/6 flex flex-row justify-center items-center text-center">
                    <AiOutlineDollar fontSize={45} color={"gray"} ></AiOutlineDollar>
                    </div>
                </div>
            </div>
        </div>
    </Link>
</div>

<div className="flex items-center justify-between mb-4">
    <h1 className="text-3xl font-serif ml-4 mb-4 text-gray-900">Configuración</h1>
</div>
<div className="grid grid-cols-2 gap-4 place-items-stretch w-auto">
    
        <div className="block w-full  bg-white border border-gray-200 rounded-lg shadow-md m-3 h-auto ">
            <div className="text-2xl rounded-t-lg p-3  bg-blue-500 text-white">
                Información Personal
            </div>
            <div className="card-body">
                <div className="m-2 ">
                    <label>Nombre: <strong className='font-bold text-gray-500'>
                        {usuario.nombre}
                    </strong></label>
                </div>
                <div className="m-2">
                    <label>Correo: <strong className='font-bold text-gray-500'>
                       {usuario.correo}
                    </strong></label>
                </div>
                <div className="m-2 ">
                    <label>Rol: <strong className='font-bold text-gray-500'>
                         {usuario.rol}
                    </strong></label>
                </div>
                <div className="m-2 ">
                    <label>Usuario: <strong className='font-bold text-gray-500'>
                    {usuario.usuario}
                    </strong></label>
                </div>
                <ul className="block w-auto m-3  bg-white border border-gray-200 rounded-lg shadow-md h-auto ">
                    <li className="text-2xl rounded-t-lg p-3  bg-blue-500 text-white">Cambiar Contraseña</li>
                    <form action="" name="frmChangePass" id="frmChangePass" className="p-3">
                        <div className=" my-1">
                            <label>Contraseña Actual</label>
                            <input 
                            type="password" 
                            name="claveactual" 
                            id="actual" 
                            placeholder="Clave Actual" 
                            required 
                            value={claves.claveactual}
                            onChange={handleChangeClave}
                            className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="my-1">
                            <label>Nueva Contraseña</label>
                            <input 
                            type="password" 
                            name="clavenueva" 
                            value={claves.clavenueva}
                            onChange={handleChangeClave}
                            id="nueva" 
                            placeholder="Nueva Clave" 
                            required className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className=" my-1">
                            <label className='my-1'>Confirmar Contraseña</label>
                            <input 
                            type="password" 
                            name="claveconfirmar" 
                            value={claves.claveconfirmar}
                            onChange={handleChangeClave}
                            id="confirmar" 
                            placeholder="Confirmar clave" 
                            required className="my-1 focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className="alertChangePass" 
                        //style="display:none;"
                        >
                        </div>
                        <div>
                            <button onClick={cambiarcontraseña} type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold my-5  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">Cambiar Contraseña</button>
                        </div>
                    </form>
                </ul>
            </div>
        </div>
    
   {isadmin ?
      
            <div className="block w-full m-3 bg-white border border-gray-200 rounded-lg shadow-md h-auto ">
                <div className="text-2xl rounded-t-lg p-3  bg-blue-500 text-white">
                    Datos de la Empresa
                </div>
                <div className="card-body">
                    <form action="" id="frmEmpresa" className="p-3">
                        <div className="my-1">
                            <label className='my-1'>Nit:</label>
                            <input 
                            type="number" 
                            name="dni" 
                            onChange={handleChangeEmpresa}
                            value={empresa.dni} 
                            id="txtDni" 
                            placeholder="Dni de la Empresa" 
                            required 
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                        </div>
                        <div className=" my-1">
                            <label className='my-1'>Nombre:</label>
                            <input 
                            type="text" 
                            name="nombre" 
                            onChange={handleChangeEmpresa}
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={empresa.nombre} 
                            id="txtNombre" 
                            placeholder="Nombre de la Empresa" 
                            required 
                            />
                        </div>
                        <div className="my-1">
                            <label className='my-1'>Razon Social:</label>
                            <input 
                            type="text" 
                            name="razon_social" 
                            onChange={handleChangeEmpresa}
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={empresa.razon_social} 
                            id="txtRSocial" 
                            placeholder="Razon Social de la Empresa"/>
                        </div>
                        <div className="my-1">
                            <label className='my-1'>Teléfono:</label>
                            <input 
                            type="number" 
                            name="telefono" 
                            onChange={handleChangeEmpresa}
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={empresa.telefono} 
                            id="txtTelEmpresa" 
                            placeholder="teléfono de la Empresa" 
                            required/>
                        </div>
                        <div className="my-1">
                            <label className='my-1'>Correo Electrónico:</label>
                            <input 
                            type="email" 
                            name="email" 
                            onChange={handleChangeEmpresa}
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={empresa.email}  
                            id="txtEmailEmpresa" 
                            placeholder="Correo de la Empresa" 
                            required/>
                        </div>
                        <div className="my-1">
                            <label className='my-1'>Dirección:</label>
                            <input 
                            type="text" 
                            name="direccion" 
                            onChange={handleChangeEmpresa}
                            className=" focus:border-blue-500 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            value={empresa.direccion} 
                            id="txtDirEmpresa" 
                            placeholder="Dirreción de la Empresa" 
                            required/>
                        </div>
                        
                        <div>
                            <button onClick={cambiarconfiguacion}type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold my-5  py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"><i className="fas fa-save"></i> Guardar Datos</button>
                        </div>

                    </form>
                </div>
            </div>
       
   :
   
            <div className="block w-full m-3 bg-white border border-gray-200 rounded-lg shadow-md h-auto">
                <div className="text-2xl rounded-t-lg p-3  bg-blue-500 text-white">
                    Datos de la Empresa
                </div>
                <div className="card-body">
                    <div className="p-3">
                        <div className="form-group">
                            <strong>Nit:</strong>
                            {empresa.dni}
                        </div>
                        <div className="form-group">
                            <strong>Nombre:</strong>
                            <h6>  {empresa.nombre}</h6>
                        </div>
                        <div className="form-group">
                            <strong>Razon Social:</strong>
                            {empresa.razon_social}
                        </div>
                        <div className="form-group">
                            <strong>Teléfono:</strong>
                            {empresa.telefono}
                        </div>
                        <div className="form-group">
                            <strong>Correo Electrónico:</strong>
                            {empresa.email}
                        </div>
                        <div className="form-group">
                            <strong>Dirección:</strong>
                            {empresa.direccion}
                        </div>
                     
                    </div>
                </div>
            </div>
  
   }
   
</div>


</div>
    );
}

export default Home;