import { createContext, useContext, useEffect, useState } from "react";


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    idusuario:0,
    nombre:"",
    correo:"",
    usuario:"",
    rol:""});

useEffect(()=>{
    setUser({
        ...user,
        idusuario:localStorage.getItem('idusuario'),
        nombre:localStorage.getItem('nombre'),
        correo:localStorage.getItem('correo'),
        usuario:localStorage.getItem('usuario'),
        rol:localStorage.getItem('rol'),



})
},[])


  const updateuser = (user) =>{
    setUser(...user)
  }
   
 


  return (
    <UserContext.Provider
      value={{
        user,
        updateuser,
        setUser

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};