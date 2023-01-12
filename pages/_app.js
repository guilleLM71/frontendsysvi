import { useEffect } from 'react';
import 'tailwindcss/tailwind.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login/Login.css"
import Router from 'next/router';
import { UserProvider } from '../context/usercontext';
export default function App({ Component, pageProps }) {
  useEffect(() => {
    const {pathname} = Router
    // conditional redirect
    if(pathname == '/' ){
        // with router.push the page may be added to history
        // the browser on history back will  go back to this page and then forward again to the redirected page
        // you can prevent this behaviour using location.replace
        Router.push('/Login')
       //location.replace("/hello-nextjs")
    }
  },[]);

  return <UserProvider> <Component {...pageProps} /></UserProvider>
}
