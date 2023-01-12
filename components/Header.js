import React, { useEffect, useState } from 'react';
import { useUser } from '../context/usercontext';

function Header({children}) {
    const { user} = useUser();
  
    return (
        <div>
            <div  className="flex flex-col">
                <div >

                    <nav className=" w-auto bg-blue-500 text-white font-bold  mb-4  shadow flex flex-col">

                        <div className=" text-2xl flex flex-row justify-between items-center p-8  ">
                            <h6>Sistema de Venta</h6>
                            <h6>Bienvenido: {user.nombre}</h6>
                           
                        </div>
                    </nav>

                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;