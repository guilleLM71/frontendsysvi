import React, { useEffect, useMemo, useState } from 'react';
import Table from './Table';
import axios from 'axios';
import Link from 'next/link';
import Modal from './Modal';
import RegistrarUsuario from './RegistrarUsuario';
import Swal from 'sweetalert2';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai'
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi'
import {TbListDetails } from 'react-icons/tb'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'
import { useRouter } from 'next/router';
import EditarUsuario from './EditarUsuario';
const rows=[]

const columns = [
{ accessor: 'idusuario', label: 'Id' },
{ accessor: 'nombre', label: 'Nombre' },
{ accessor: 'correo', label: 'Correo'},
{ accessor: 'usuario', label: 'Usuario'},
{ accessor: 'rol', label: 'Rol'},

]
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

function Usuarios(props) {
    const [rows,setRows]=useState([])
    const [usuario,setUsuario]=useState({id:0})


    const router=useRouter()
    const [activePage, setActivePage] = useState(1)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState({ order: 'asc', orderBy: 'id' })
    const rowsPerPage = 5
  
    const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() => sortRows(filteredRows, sort), [filteredRows, sort])
    const calculatedRows = paginateRows(sortedRows, activePage, rowsPerPage)
  
    const count = filteredRows.length
    const totalPages = Math.ceil(count / rowsPerPage)
  
    const handleSearch = (value, accessor) => {
      setActivePage(1)
  
      if (value) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [accessor]: value,
        }))
      } else {
        setFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters }
          delete updatedFilters[accessor]
  
          return updatedFilters
        })
      }
    }
  
    const handleSort = (accessor) => {
      setActivePage(1)
      setSort((prevSort) => ({
        order: prevSort.order === 'asc' && prevSort.orderBy === accessor ? 'desc' : 'asc',
        orderBy: accessor,
      }))
    }

    useEffect(()=>{
        
        getusuarios()
        //console.log(usuario)
    },[])

    async function  getusuarios(){
      
    //const p = md5("admin")
       await axios.get(`http://localhost:4000/api/users`,
            { headers: { "xx-token": localStorage.getItem('token')} }
       )
       .then((res)=>{
           //console.log(res)
            
            //rows.push(res.data)
            setRows(res.data.userdb)
           // console.log('rowsf :>> ', rowsf);
          }).catch((error)=>{
            console.log('error :>> ', error);
       
          })
    }

    async function eliminarusuario(event,id){
        event.preventDefault();
        var result = confirm(`Desea eliminar al usuario ${id} ?`);
        if(result){
            console.log('id :>> ', id);
         await axios.post(`http://localhost:4000/api/users/eliminarusuario`,
         {
            idusuario:id
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
              getusuarios()
            }).catch((error)=>{
              console.log('error :>> ', error);
                Swal.fire({
                title: res.data.msg,
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
            })

        }

        getusuarios()
    }

    async function eliminarusuario(event,id){
      event.preventDefault();
      var result = confirm(`Desea eliminar al usuario ${id} ?`);
      if(result){
          console.log('id :>> ', id);
       await axios.post(`http://localhost:4000/api/users/eliminarusuario`,
       {
          idusuario:id
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
            getusuarios()
          }).catch((error)=>{
            console.log('error :>> ', error);
              Swal.fire({
              title: res.data.msg,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          })

      }

      getusuarios()
  }

    return (
        <div className="container">

        <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-serif ml-4 mb-4 text-gray-900">Panel de Administración</h1>
           
             
       <Modal tbtn={"Nuevo Usuario"}
        title={"Registro de Usuarios"}>
        <RegistrarUsuario
            render={getusuarios}
        ></RegistrarUsuario>
       </Modal>
        </div>
        <table className='text-black w-auto pt-2  pb-2 m-4 '>
        <thead className='bg-blue-500 w-auto pt-2  pb-2 m-2 '>
          <tr className='p-3 m-3 '>
            {columns.map((column) => {
              const sortIcon = () => {
                if (column.accessor === sort.orderBy) {
                  if (sort.order === 'asc') {
                    return <BiSortUp width={50} height={50}/>
                  }
                  return <BiSortDown width={50} height={50}/>
                } else {
                  return <BiSort width={50} height={50}/>
                }
              }
              return (
                <th className=' p-2 m-2 border-2 border-blue-500'key={column.accessor}>
                  <span >{column.label}</span>
                  <button onClick={() => handleSort(column.accessor)}>{sortIcon()}</button>
                </th>
              )
            })}
              <th >
                
            </th>
          </tr>
          <tr>
            {columns.map((column) => {
              return (
                <th className='border-2 border-blue-500' >
                  <input 
                  className='focus:border-blue-500 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    key={`${column.accessor}-search`}
                    type="search"
                    placeholder={`Buscar ${column.label}`}
                    value={filters[column.accessor]}
                    onChange={(event) => handleSearch(event.target.value, column.accessor)}
                  />
                </th>
              )
            })
              
            }
            <th className='border-2 border-blue-500' colSpan={2}>
                 Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.idusuario}>
                {columns.map((column) => {
                   return(
                    <td className='border-2 border-blue-500 py-2 px-3' key={column.accessor}>
                    {row[column.accessor]}
                    </td>)
                })}
                <td className='flex justify-center items-center border-2 border-blue-500'>
                { <>
                  <a >  

                  <Modal tbtn={<AiFillEdit size={15} ></AiFillEdit>}
                  title={`Desea editar al usuario ${row.idusuario} ?`}>
                  <EditarUsuario
                      id={row.idusuario}
                      render={getusuarios}
                  ></EditarUsuario>
                </Modal>
                  </a>
                  <a className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' onClick={(event)=>{eliminarusuario(event,row.idusuario)}}>  
                  <AiFillDelete  color={"red"} size={15}></AiFillDelete>  
                  </a>
                 
                  </>

                }
               
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {count > 0 ? (
        <Pagination
          activePage={activePage}
          count={count}
          rowsPerPage={rowsPerPage}
          totalPages={totalPages}
          setActivePage={setActivePage}
        />
      ) : (
        <p className='text-black' >No data found</p>
      )}
        
      {// <Table rows={rows} columns={columns} clickdelete={eliminarusuario} ></Table> 
      }
        </div>
    );
}

export default Usuarios;