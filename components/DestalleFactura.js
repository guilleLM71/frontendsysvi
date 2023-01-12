import React, { useEffect, useState } from 'react';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { useUser } from '../context/usercontext';
import axios from 'axios';

function DestalleFactura({btn,nofactura}) {


    const [factura,setFactura]=useState({
        direccion: "",
        fecha: "",
        nofactura:0,
        nombre: "",
        telefono: "",
        totalfactura:0
    })
    const [detallef,setDetallef]=useState([])
    useEffect(()=>{
       
        //getfactura(nofactura)
        //console.log('factura :>> ', factura);
    },[detallef])

    async function getfactura(nf){
        await axios.post('http://localhost:4000/api/ventas/getfactura', 
        {
           nofactura:nf,
        },
        { headers: { "xx-token": localStorage.getItem('token')} })
        .then((res)=>{
             console.log(res)
              setFactura(res.data.facturadb[0][0])
              setDetallef(res.data.detallefacturadb)
              //console.log('factura :>> ', res.data.facturadb[0][0]);
                console.log('detalle :>> ', res.data.detallefacturadb);
           }).catch((error)=>{

                console.log(error)
           })
    }



   

    const {user}=useUser()

    function generate() {
      getfactura(nofactura)
        const doc = new jsPDF()   
        doc.setFontSize(15);
        doc.setFont("times");
        doc.text( "empresa", doc.internal.pageSize.getWidth()/2, 20, {align: "center"} );
        doc.text( `Ruc: ${user.nombre}`, 20, 30 );
        doc.text( `Telefono: ${user.nombre}`, 20, 40 );
        doc.text( `Direccion: ${user.nombre}`, 20, 50 );
        doc.text( `NroFactura: ${nofactura}`,20, 60  );
        doc.text( `Fecha: ${factura.fecha}`, doc.internal.pageSize.getWidth()/2, 60  );
        
        doc.setFontSize(20);
        doc.setFont("bold");
        doc.text( `Datos del Cliente`,doc.internal.pageSize.getWidth()/2, 85, {align: "center"}  );
        doc.setFontSize(15);
        doc.setFont("times");
        doc.autoTable(
            
            {
                margin: { top: 90 }, 
                head: [['Nombre', 'Telefono', 'Direccion']],
                body:[[factura.nombre, factura.telefono, factura.direccion]]
        })
        doc.autoTable()
        
        doc.setFontSize(20);
        doc.setFont("bold");
        doc.text( `Detalle de Productos`,doc.internal.pageSize.getWidth()/2, 115,{align: "center"}  );

        doc.setFontSize(15);
        doc.setFont("times");

        doc.autoTable(
            
            {
                margin: { top: 145 }, 
                head: [['Descripcion', 'Cantidad', 'Precio', 'Total']],
                body: detallef.map(({ descripcion, cantidad, precio,total }) => {
                    return [
                      descripcion,
                      cantidad,
                      precio,
                      total
                    ]
                  }),
               
                foot: [[ 'Total','-','-',factura.totalfactura]] ,

                  
        })

        doc.setFontSize(18);
        doc.setFont("bold");
        doc.text( `Gracias por su preferencia`, doc.internal.pageSize.getWidth()/2,290,{align: "center"}  );

    
        doc.save('persons.pdf')
    }



    return (
      <div>
        <button 
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={generate}>{btn}</button> 
      </div>
    );
}

export default DestalleFactura;



