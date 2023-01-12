import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import Home from '../../components/Home';
import { useUser } from "../../context/usercontext";
function index(props) {
   
    const { user, updateuser,setUser} = useUser();
    const [usuario, setUsuario]=useState({
        idusuario:"",
        nombre:"",
        usuario:"",
        rol:"",
        correo:""
    })
    const router = useRouter();
    useEffect( ()=>{   
        if(localStorage.getItem('token')==null)
        {
          router.push('/Login')
        }   
        renderperfil()
        console.log(user)

        
       
    },[])


    
    async function renderperfil(){
        
        await axios.get("http://localhost:4000/api/users/usuario",
            {headers:{
            "Content-type": "application/json; charset=UTF-8",                 
            "xx-token":localStorage.getItem('token')}}
        )
        .then((res)=>{
            console.log(res.data.user)
            localStorage.setItem('idusuario', res.data.user.idusuario);
            localStorage.setItem('nombre', res.data.user.nombre);
            localStorage.setItem('usuario', res.data.user.usuario);
            localStorage.setItem('rol', res.data.user.rol);
            localStorage.setItem('correo', res.data.user.correo);
            setUser({...res.data.user})
            setUsuario({...res.data.user})
            //console.log('usuario :>> ', usuario);

        }).catch(()=>{
            
        })
    }
   

    return (
        <div className='dashboard'>

         
             <Layout usuario={usuario} >
                <Header usuario={usuario}>     
                    <Home usuario={usuario}></Home>
                </Header>
             </Layout>
              

        </div>
    );
}

export default index;