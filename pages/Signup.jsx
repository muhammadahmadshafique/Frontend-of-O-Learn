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


export default function Signup() {

    

    //All States 
    const [name,setName]= useState("");
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
      if(user) router.push("/");
  }, [user]);



    // console.table({name,password, email})

    const handlesubmit= async (e)=>{
        e.preventDefault();
        try{
            setLoading(true)

            const {data}= await axios.post("/api/signup",{name,password,email})
            console.log(data)
            setLoading(false)
            if(data.ok){
                 toast("Sign Up Successful!")
            }
            router.push("/Signin")
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
                    <h4>Create an account</h4>
                    <input type="text" value={name} className={styles.cssinput} placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                    <input type="email" value={email} className={styles.cssinput} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    <input type="password" value={password} className={styles.cssinput} placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
                    <button className={styles.buttontext} onClick={handlesubmit} type="submit" >{loading? <Spin style={{color:"red"}} />: "Sign up"}</button>
                </div>
                <p>Already have an account?<span className={styles.logincolor}> Log In</span></p>
             </div>
            </div>

        </>
    )
}
