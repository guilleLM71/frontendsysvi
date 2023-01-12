import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useUser } from '../context/usercontext';
import RegistrarCliente from './RegistroCliente';
import Modal from './Modal';
import { round } from 'lodash';
import Swal from 'sweetalert2';

function GenerarVenta({render}) {
    const {user}=useUser()

    const [cliente,setCliente]=useState({
        idcliente:"",
        dni:"",
        nombre:"",
        telefono:"",
        direccion:"",

    })

    const [producto,setProducto]=useState({
        codproducto:"",
        descripcion:"",
        precio:"",
        existencia:""
    })
    
    const [cantidad,setCantidad]=useState({
        sw:false,
        cantidad:0,
        total:0}
        )
    
    const [detalle, setDetalle]=useState([])
    useEffect(()=>{
        console.log('cantidad :>> ', cantidad);
        console.log('cliente :>> ', cliente);
        console.log('producto :>> ', producto);
      
       getdetalletemp()
     
    },[cliente])


    const handleChange = ( {  target: { name, value } }) => 
    { 
            setCliente({ ...cliente, [name]: value });
            
    }

    const handleChangeProducto = ( {  target: { name, value } }) => 
    { 
            setProducto({ ...producto, [name]: value });
            
    }

    const handleChangeCantidad = ( {  target: { name, value } }) => 
    { 
            setCantidad({ ...cantidad, [name]: value });
       
    }

    

    async function buscarcliente(dni){
        console.log('cliente.dni :>> ', dni);
        await axios.post('http://localhost:4000/api/clientes/getclientedni', 
        {
         dni:dni
        },
        { headers: { "xx-token": localStorage.getItem('token')} })
        .then((res)=>{
             //console.log(res)
             setCliente({...res.data.user})
            console.log('clienteres :>> ', cliente);
  
           }).catch((error)=>{
      
                console.log(error)
           })
    }

    async function  getclientes(){
      
        //const p = md5("admin")
           await axios.get(`http://localhost:4000/api/clientes`,
                { headers: { "xx-token": localStorage.getItem('token')} }
           )
           .then((res)=>{
               console.log(res)

              }).catch((error)=>{
                console.log('error :>> ', error);
           
              })
    }

    async function buscarproductoid(cod){     
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
    
        async function agregarventatemp(){     
            //const p = md5("admin")
               await axios.post('http://localhost:4000/api/ventas/detalletmp', 
               {
                codproducto:producto.codproducto,
                cantidad:cantidad.cantidad,
                token:localStorage.getItem('token'),

               },
               { headers: { "xx-token": localStorage.getItem('token')} })
               .then((res)=>{
                    console.log(res)
                   getdetalletemp()
 
                  }).catch((error)=>{

                       console.log(error)
                  })
        }
        async function getdetalletemp(){     
            //const p = md5("admin")
               await axios.post('http://localhost:4000/api/ventas/getdetalletmp', 
               {
                  token:localStorage.getItem('token'),
               },
               { headers: { "xx-token": localStorage.getItem('token')} })
               .then((res)=>{
                    console.log(res)
                     setDetalle(res.data.ventasdb)
                     console.log('detalle :>> ', detalle);
                  }).catch((error)=>{

                       console.log(error)
                  })
        }
    
        async function anularventa(){

        }

        async function procesarventa(){
            await axios.post('http://localhost:4000/api/ventas/procesarventa', 
            {
               idusuario:user.idusuario,
               idcliente:cliente.idcliente,
               token:localStorage.getItem('token'),
            },
            { headers: { "xx-token": localStorage.getItem('token')} })
            .then((res)=>{
                 console.log(res)
                  //setDetalle(res.data.ventasdb)
                 // console.log('detalle :>> ', detalle);
                  getdetalletemp()
                  render()
               }).catch((error)=>{

                    console.log(error)
               })
        }


        async function eliminardetalletmp(event, cod){
            event.preventDefault();
            var result = confirm(`Desea eliminar al cliente ${cod} ?`);
            if(result){
                console.log('id :>> ', cod);
             await axios.post(`http://localhost:4000/api/ventas/deldetalletmp`,
             {
                correlativo:cod,
               
                token:localStorage.getItem('token')

             }
              ,{ headers: { "xx-token": localStorage.getItem('token')} }
             )
             .then((res)=>{
                 console.log(res)
                 Swal.fire({
                    title: res.data.msg,
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  })
                  getdetalletemp()
                }).catch((error)=>{
                  console.log('error :>> ', error);
                    Swal.fire({
                    title: error,
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                  })
                })
    
            }
    
           
        }


    return (
        <div className="container w-auto">
        <div className="">
            <div className="w-full">
                
                <div className='block m-1 w-auto bg-white border border-gray-200 rounded-lg shadow-md h-auto'>
                <h4 className="flex justify-center items-center bg-blue-500 text-white h-10 font-bold text-3xl py-2 m-auto text-center rounded-t-lg ">
                    Datos Venta
                </h4>
                <div className='flex flex-row p-1 m-1 gap-3 bg-white border border-gray-200 rounded-lg shadow-md h-auto'>

                
                <div className='w-4/12 block  bg-white border border-gray-200 rounded-lg shadow-md h-auto'>

                    <div className="">
                    <div className="">
                        <div className="">
                            <label className="w-auto flex justify-center items-center bg-blue-500 text-white h-10 font-bold text-2xl  text-center rounded-t-lg " > Vendedor</label>
                            <p className="m-2  text-sm uppercase text-black h-3/6 ">
                                Usuario : {user.usuario}
                            </p>
                            <p className="m-2  text-sm uppercase text-black h-3/6 ">
                                Nombre : {user.nombre}
                            </p>
                            <p className="m-2  text-sm uppercase text-black h-3/6 ">
                               Rol :  {user.rol}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center h-3/6 ">
                        <label className='text-sm font-bold bg-white border border-gray-200 rounded-lg shadow-md '>Acciones</label>
                        <div id="acciones_venta" className="flex flex-col justify-center items-center ">
                            <button hidden={detalle.length==0?true:false} onClick={anularventa} className="mt-1 bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="btn_anular_venta">Anular</button>
                            <button hidden={detalle.length==0?true:false}  onClick={procesarventa}  className="mt-1 bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" id="btn_facturar_venta"><i className="fas fa-save"></i> Generar Venta</button>
                        </div>
                    </div>
                </div>

                 </div>

                 <div className='w-8/12  block  bg-white border border-gray-200 rounded-lg shadow-md h-auto'>
                
                 <div className="">
                    <h4 className="w-auto  flex justify-center items-center bg-blue-500 text-white h-10 font-bold text-2xl  text-center rounded-t-lg ">Datos del Cliente</h4>
                </div>
            <div className='m-2'>
                <Modal tbtn={"Nuevo Cliente"}
                    title={"Registro de Clientes"}>
                    <RegistrarCliente
                        render={getclientes}
                    >
                        
                    </RegistrarCliente>
                </Modal>
                </div>
                
                <div className="card">
                    <div className="card-body">
                        <form name="form_new_cliente_venta" id="form_new_cliente_venta">
                            <input type="hidden" name="action" value="addCliente"/>
                            <input type="hidden" id="idcliente" value="1" name="idcliente" required/>
                            <div className="row">
                                <div className="">
                                    <div className="my-1">
                                        <label>Dni</label>
                                        <input type="text" 
                                        value={cliente.dni}
                                        onChange={(event)=>{handleChange(event);buscarcliente(event.target.value)}}
                                        name="dni" 
                                        id="dni" 
                                        className="my-1 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="my-1">
                                        <label>Nombre</label>
                                        <input type="text"
                                        value={cliente.nombre} 
                                        onChange={handleChange}
                                        name="nombre" 
                                        id="nombre" 
                                        className="my-1 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        disabled required/>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="my-1">
                                        <label>Teléfono</label>
                                        <input type="number"
                                         name="telefono"
                                         value={cliente.telefono}
                                         onChange={handleChange}
                                          id="telefono" 
                                          className="my-1 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           disabled required/>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="my-1">
                                        <label >Dirreción</label>
                                        <input type="text" 
                                        name="direccion"
                                        value={cliente.direccion}
                                        onChange={handleChange} 
                                        id="direccion" 
                                        className="my-1 focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                        disabled required/>
                                    </div>

                                </div>
                               
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </div>
                <div className='w-auto block p-3 m-1 bg-white border border-gray-200 rounded-lg shadow-md h-auto'>
                  <div className="table-responsive">
                    <table className=" w-auto pt-2  pb-2 m-4">
                        <thead className="">
                            <tr className='text-white bg-blue-500 w-auto p-3 m-3'>
                                <th className='p-2 m-2 'width="100px">Código</th>
                                <th>Des.</th>
                                <th>Stock</th>
                                <th width="100px">Cantidad</th>
                                <th className="textright">Precio</th>
                                <th className="textright">Precio Total</th>
                                <th>Acciones</th>
                            </tr>
                            <tr className='p-3 m-3'>
                                <td className='p-2 m-2 '>
                                    <input 
                                    className="focus:border-blue-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    type="number" 
                                    name="codproducto" 
                                    id="codproducto"
                                    value={producto.codproducto}
                                    onChange={(event)=>{handleChangeProducto(event);buscarproductoid(event.target.value)}}
                                    />
                                </td>
                                <td id="txt_descripcion">
                                    {producto.length===0?"-":producto.descripcion}
                                </td>
                                <td id="txt_existencia">
                                    {producto.length===0?"-":producto.existencia}
                                </td>
                                <td><input 
                                className="focus:border-blue-500 shadow w-full appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number" 
                                name="cantidad" 
                                id="cantidad"
                                value={cantidad.cantidad}
                                onChange={handleChangeCantidad}
                                //disabled={producto.length===0?true:false}
                                
                                /></td>
                                <td id="txt_precio" className="textright">
                                {producto.length===0?"0.00":producto.precio}

                                </td>
                                <td 
                                id="total"
                                name="total"
                                value={cantidad.total=cantidad.cantidad*producto.precio}
                                onChange={handleChangeCantidad}
                                className="txtright">{cantidad.total=cantidad.cantidad*producto.precio}
                                </td>
                                <td><button
                                onClick={agregarventatemp}
                                className="mt-1 bg-slate-600 text-white active:bg-slate-400 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                            
                                >Agregar</button></td>
                            </tr>
                            <tr className='text-white bg-blue-500 w-auto p-3 m-3'>
                                
                                <th className='p-2 m-2 '>Codigo</th>
                                <th colspan="2">Descripción</th>
                                <th>Cantidad</th>
                                <th className="textright">Precio</th>
                                <th className="textright">Precio Total</th>
                                <th>Acciones</th>
                            </tr>
                          


                        </thead>
                        <tbody id="detalle_venta">
                        {
                                    detalle.map(detalle=>{
                                        let precioTotal = round(detalle.cantidad * detalle.precio_venta, 2);
                             
                                        return (
                                            <tr key={detalle.correlativo} className='hover:bg-slate-300 border-b-2 border-slate-300'>
                                            <th className='p-2 m-2 '>{detalle.correlativo}</th>
                                            <th colspan="2">{detalle.descripcion}</th>
                                            <th>{detalle.cantidad}</th>
                                            <th className="text-right">{detalle.precio_venta}</th>
                                            <th className="text-right">{precioTotal}</th>
                                            <th>
                                            <button
                                                onClick={(event)=>{eliminardetalletmp(event,detalle.correlativo)}}
                                                className="mt-1 bg-red-400 text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                                    
                                                >Eliminar</button>
                                                
                                            </th>   
                                            </tr>   
                                        )
                                    })

                                }

                        </tbody>

                        <tfoot id="detalle_totales">
                        
                        </tfoot>
                    </table>

                  </div>

                  </div>

                  </div>
            </div>
        </div>

    </div>
    );
}

export default GenerarVenta;