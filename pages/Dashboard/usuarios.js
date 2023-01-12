import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Usuarios from '../../components/Usuarios';

function usuarios(props) {
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
            <Usuarios>
                
            </Usuarios>
       </Header> 
       
   </Layout> 
    );
}

export default usuarios;