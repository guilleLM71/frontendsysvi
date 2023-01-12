import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Router, { useRouter } from 'next/router'
import axios from "axios";
import md5 from "blueimp-md5";
import Login from "../../components/Login";
function index() {

  return (
    <Login></Login>
  );
}

export default index;
