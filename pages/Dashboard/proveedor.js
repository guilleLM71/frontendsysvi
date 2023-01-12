import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Proveedor from '../../components/Proveedor';

function proveedor(props) {
    const router = useRouter();
    useEffect( ()=>{   
        if(localStorage.getItem('token')==null)
        {
          router.push('/Login')
        }    
       
       
    },[])
    return (
        <Layout>   
        <Header>
            <Proveedor>
                
            </Proveedor>
       </Header> 
       
   </Layout> 
    );
}

export default proveedor;