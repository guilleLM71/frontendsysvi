import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Ventas from '../../components/Ventas';

function ventas(props) {
    const router = useRouter();
    useEffect( ()=>{   
        if(localStorage.getItem('token')==null)
        {
          router.push('/Login')
        }    
       
       
    },[])
    return (
        <div>
            <Layout>   
                 <Header>
                     <Ventas></Ventas>
                </Header> 
                
            </Layout> 
        </div>
    );
}

export default ventas;