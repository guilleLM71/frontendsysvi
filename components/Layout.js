import React from "react";

import Navbar from "./Navbar";


const Layout = ({ children }) => {
  return (

    <div className="min-h-screen flex flex-row justify-start">
      <Navbar/>
      <div className="bg-primary flex-1 text-white">
          {children}
      </div>
    </div>

  );
};

export default Layout;
