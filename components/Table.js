import { useRouter } from 'next/router'
import React, { useState, useMemo } from 'react'
import { AiFillDelete, AiFillEdit, AiFillFileAdd } from 'react-icons/ai'
import { BiSort, BiSortDown, BiSortUp } from 'react-icons/bi'
import {TbListDetails } from 'react-icons/tb'
import { sortRows, filterRows, paginateRows } from './helpers'
import { Pagination } from './Pagination'

const Table = ({ columns, rows ,clickdelete}) => {
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

  const clearAll = () => {
    setSort({ order: 'asc', orderBy: 'id' })
    setActivePage(1)
    setFilters({})
  }
  return (
    <>
    {//console.log("router", router)
    }
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
                <th className=' p-2 m-2 'key={column.accessor}>
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
                <th>
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
            <th colSpan={2}>
                 Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {calculatedRows.map((row) => {
            return (
              <tr key={row.idusuario}>
                {columns.map((column) => {
                  if (column.format) {
                    return(
                      <td className='border-2 border-blue-500 py-2 px-3' key={column.accessor}>
                      {column.format(row[column.accessor])}
                      </td>)
                  }
                  return(
                    <td className='border-2 border-blue-500 py-2 px-3' key={column.accessor}>
                    {row[column.accessor]}
                    </td>)
                })}
                <td className='flex justify-center items-center'>
                {router.pathname=='/Dashboard/ventas'?
                  <TbListDetails size={30}></TbListDetails> 
                  : router.pathname=='/Dashboard/productos'?
                  <>
                  <AiFillFileAdd  size={30}></AiFillFileAdd>
                  <AiFillEdit size={30}></AiFillEdit>
                  <a onClick={()=>{setUsuario({id:row.idusuario})}}>
                  <AiFillDelete onClick={()=>{clickdelete(row.idusuario)    }} color={"red"} size={30}></AiFillDelete>
                  </a>
                  </>
                  
                  : <>
                  <AiFillEdit size={30}></AiFillEdit>
                  <a onClick={(event)=>{
                                  clickdelete(event,row.idusuario)     
                }}>  
                  <AiFillDelete  color={"red"} size={30}></AiFillDelete>  
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

    </>
  )
}


export default Table;