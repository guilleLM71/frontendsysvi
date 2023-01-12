import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo, useEffect } from "react";

import {RiArticleLine} from "react-icons/ri"
import {AiOutlineHome} from "react-icons/ai"
import {FiUsers} from "react-icons/fi"
import {IoIosArrowBack,IoLogoNodejs} from "react-icons/io"
import {BiLogOut} from "react-icons/bi"
import { useUser } from "../context/usercontext";

const menuItems = [
  { id: 1, label: "Home", icon: AiOutlineHome, link: "/Dashboard" ,permiso:"todos"},
  { id: 2, label: "Ventas", icon: RiArticleLine, link: "/Dashboard/ventas" ,permiso:"todos"},
  { id: 3, label: "Productos", icon:FiUsers, link: "/Dashboard/productos" ,permiso:"todos"},
  { id: 4, label: "Clientes", icon: RiArticleLine, link: "/Dashboard/clientes",permiso:"todos" },
  { id: 5, label: "Proveedor", icon:FiUsers, link: "/Dashboard/proveedor" ,permiso:"todos"},
  { id: 6, label: "Usuarios", icon:FiUsers, link: "/Dashboard/usuarios" ,permiso:"admin"},
];



const Navbar = ({}) => {


  
  const { user, updateuser} = useUser();
  const [rol,setRol]=useState("")
    useEffect(() =>{
        setRol(localStorage.getItem('rol'))
    },[]);

  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  

  const activeMenu = useMemo(
   
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-auto  px-4 pt-8 pb-4 bg-blue-500 text-white flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "hover:bg-blue-400 p-4 rounded bg-blue-300 absolute right-0",
    {
      "rotate-180 ": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
   // " transform motion-safe:hover:scale-110 hover:bg-blue-400 flex items-center cursor-pointer rounded w-full overflow-hidden whitespace-nowrap"
    return classNames(
      "transform motion-safe:hover:scale-110 flex items-center cursor-pointer hover:bg-blue-400 rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-blue-400 scale-110 "]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const logout=()=>{
    localStorage.setItem('idusuario', "");
    localStorage.setItem('nombre', "");
    localStorage.setItem('usuario', "");
    localStorage.setItem('rol', "");
    localStorage.setItem('correo', "");
    localStorage.setItem('token', "");
    router.push("/Login");

  }

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <IoLogoNodejs fontSize={30}/>
            <span
              className={classNames("mt-2 text-lg font-medium text-text", {
                hidden: toggleCollapse,
              })}
            >
              Logo
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <IoIosArrowBack fontSize={30} />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
          {menuItems.map(({ icon: Icon, ...menu }) => {
          if(menu.permiso=="todos" && user.rol=="Vendedor"){
            const classes = getNavItemClasses(menu);
            return (
              <div className={classes}>
                
                <Link href={menu.link}   className="flex py-4 px-3 items-center w-full h-full" >
                 
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  
                </Link>
              </div>
            );
          }
          else{
            if((menu.permiso=="todos" || menu.permiso=="admin") && user.rol=="Administrador"){
              const classes = getNavItemClasses(menu);
            return (
              <div className={classes}>
                
                <Link href={menu.link}   className="flex py-4 px-3 items-center w-full h-full" >
                 
                    <div style={{ width: "2.5rem" }}>
                      <Icon />
                    </div>
                    {!toggleCollapse && (
                      <span
                        className={classNames(
                          "text-md font-medium text-text-light"
                        )}
                      >
                        {menu.label}
                      </span>
                    )}
                  
                </Link>
              </div>
            );
            }
          }
          })}
        </div>
      </div>

      <div onClick={logout} className={`${getNavItemClasses({})}px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <BiLogOut />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
