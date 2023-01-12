import React, { useEffect, useMemo, useState } from 'react';
import Table from './Table';
import axios from 'axios';
import Link from 'next/link';
import Modal from './Modal';
import GenerarVenta from './GenerarVenta';
import Swal from 'sweetalert2';
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai'
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi'
import {TbListDetails } from 'react-icons/tb'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'
import { useRouter } from 'next/router';
import DestalleFactura from './DestalleFactura';
//import EditarUsuario from './EditarUsuario';
const rows=[]

const columns = [
{ accessor: 'nofactura', label: 'NroFactura' },
{ accessor: 'fecha', label: 'Fecha' },
{ accessor: 'totalfactura', label: 'Total'}

]

function Ventas(props) {

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
        getventas()
    },[])

    async function  getventas(){
      
    //const p = md5("admin")
       await axios.get(`http://localhost:4000/api/ventas`,
            { headers: { "xx-token": localStorage.getItem('token')} }
       )
       .then((res)=>{
           console.log(res)
            
            //rows.push(res.data)
            setRows(res.data)
            console.log('rows :>> ', rows);
          }).catch((error)=>{
            console.log('error :>> ', error);
       
          })
    }

  
    return (
        <div className="container">

        <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-serif ml-4 mb-4 text-gray-900">Panel de Administración</h1>
            <Modal tbtn={"Nueva venta"}
        title={"Registrar Venta"}>
        <GenerarVenta
            render={getventas}
        ></GenerarVenta>
       </Modal> 
      
        </div>
        <div className="grid grid-cols-1 place-items-stretch">
        <table className='text-black w-auto pt-2 pb-2 m-4 '>
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
                <th className=' p-2 m-2 border-2 border-blue-500 'key={column.accessor}>
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
                <th className='border-2 border-blue-500'>
                  <input 
                  className='focus:border-blue-500   shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
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
              <tr key={row.nofactura}>
                {columns.map((column) => {
                   return(
                    <td className='border-2 border-blue-500 py-2 px-3' key={column.accessor}>
                    {row[column.accessor]}
                    </td>)
                })}
                <td className='flex justify-center items-center border-2 border-blue-500'>
                { <>
                  <a >  

                  
                  <DestalleFactura
                      btn={<TbListDetails size={15} ></TbListDetails>}
                      nofactura={row.nofactura}
                  ></DestalleFactura> 
           
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
        </div>
    );
}

export default Ventas;