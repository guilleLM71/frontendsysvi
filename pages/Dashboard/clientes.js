import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Clientes from '../../components/Clientes';
import Header from '../../components/Header';
import Layout from '../../components/Layout';

function clientes(props) {
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
            <Clientes>
                
            </Clientes>
       </Header> 
       
   </Layout> 
    );
}

export default clientes;