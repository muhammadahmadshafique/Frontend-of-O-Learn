import React, { useState } from 'react'
import styles from "../styles/Signup.module.css"
import axios from "axios"
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from "react";
import { Context } from "../context/index";
import { useEffect } from 'react';


export default function Signin() {


  //All States 
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [loading,setLoading]=useState(false)


  //Other Things
  const router = useRouter()

  //Context Api Things
  const {state,dispatch}= useContext(Context);
    console.log("state is ", state);
    const {user}=state;
    


  useEffect(() => {
      if(user) router.push("/StudentDashboard");
  }, [user]);







  const handlesubmit= async ()=>{
    try{
        setLoading(true)

        const {data}= await axios.post("/api/signin",{password,email})
        console.log(data)
        setLoading(false)
        toast("Login Successfully")
        dispatch({
          type:"LOGIN",
          payload: data
      })
      //Save in the local storage 
      window.localStorage.setItem("user",JSON.stringify(data))
      //redirect
        if(data){
          router.push("/StudentDashboard")

        }
        
        
        
    }
    catch(err){
        setLoading(false)
        console.log(err.message)
        toast(err.response.data)
      
    }
}





  return (
    <>
            <div className={styles.mainsignup}>
             <div className={styles.mainsignupfirst}>
                <div  className={styles.mainsignupfirstfirstdiv}>
                  <span  className={styles.mainsignupfirstspan1}><a href="">About us</a></span>
                  <span  className={styles.mainsignupfirstspan2}><a href = "mailto: muhammadahmadrcs@gmail.com">Contact Us</a></span>
                </div>
                <div  className={styles.mainsignupfirstsecond}>

                    <div  className={styles.mainsignupfirstseconddiv}>
                        <img src="/signup.png" alt="" srcset="" />
                    </div>

                </div>
             </div>
             <div className={styles.mainsignupsecond}>

                <div className={styles.logotextttt}>
                    <img src="/logog.png" alt="" srcset="" />
                    <span className={styles.el} >E-Learning</span>
                </div>

                <div className={styles.inputhandle}>
                    <h4>Login to Start Learning</h4>
                    <input type="email" className={styles.cssinput} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" className={styles.cssinput} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    <button className={styles.buttontext} onClick={handlesubmit} type="submit" >{loading? <Spin style={{color:"red"}} />: "Sign In"}</button>
                </div>
                <p>HAVE’Not Yet account?<span className={styles.logincolor}> Create Account</span></p>
                <p>Forget Pssword<span className={styles.logincolor}><Link href="/ForgetPassword">
                        <a>Reset Your Password</a>
                    </Link></span></p>
             </div>
            </div> 

        </>
  )
}
