import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Productos from '../../components/Productos';

function productos(props) {
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
                    <Productos></Productos>
                </Header> 
            </Layout> 
        </div>
    );
}

export default productos;