/* eslint-disable jsx-a11y/accessible-emoji */

import { BiFirstPage, BiLastPage } from "react-icons/bi"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

export const Pagination = ({ activePage, count, rowsPerPage, totalPages, setActivePage }) => {
    const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
    const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
  
    return (
      <>
        <div className="pagination text-black  flex flex-row justify-between mx-5 items-center rounded-sm">
         
          <div className="flex flex-row justify-center items-center gap-3 font-bold rounded-md border-blue-500 border-2 p-1">
          <p className='text-black'> 
          Pagina {activePage} de {totalPages}
        </p>
        <p className='text-black'>
          Registros: {beginning === end ? end : `${beginning} - ${end}`} of {count}
        </p>
          </div>
 <div>
          <button disabled={activePage === 1} onClick={() => setActivePage(1)}>
            <BiFirstPage color="black" size={35} className="bg-blue-400 hover:bg-blue-600 rounded-sm"/>
          </button>
          <button >
            <IoIosArrowBack color="black" size={35}  className="bg-blue-400 hover:bg-blue-600 rounded-sm"/>
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(activePage + 1)}>
           <IoIosArrowForward color="black" size={35} className="bg-blue-400 hover:bg-blue-600 rounded-sm " />
          </button>
          <button disabled={activePage === totalPages} onClick={() => setActivePage(totalPages)}>
            <BiLastPage color="black" size={35} className="bg-blue-400 hover:bg-blue-600 rounded-sm" />
          </button>

          </div>
          
        </div>
       
      </>
    )
  }
  