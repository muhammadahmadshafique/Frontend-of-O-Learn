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


export default function ForgetPassword() {

    

    //All States 
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);


    //Other Things
    const router = useRouter()
    

  //Context Api Things
  const {state,dispatch}= useContext(Context);
    console.log("state is ", state);
    const {user}=state;
    


  useEffect(() => {
      if(user) router.push("/");
  }, [user]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      console.log(data)
      setSuccess(true);
      if(data.user ){
      toast("Check your email for the secret code");}
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // console.log(email, code, newPassword);
    // return;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      toast(data.ok);
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast(err.response.data);
    }
  };

    
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
                    <h4>Reset Your Password</h4>
                    
                    <input type="email" value={email} className={styles.cssinput} placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                    {success&& (<><input type="password" value={newPassword} className={styles.cssinput} placeholder="New Password" onChange={(e)=>setNewPassword(e.target.value)} /></>)}
                    {success&& (<><input type="text" value={code} className={styles.cssinput} placeholder="Code" onChange={(e)=>setCode(e.target.value)} /></>)}
                    <button className={styles.buttontext} onClick={success?handleResetPassword:handleSubmit } type="submit" >{loading? <Spin style={{color:"red"}} />: "Submit"}</button>
                </div>
                
             </div>
            </div>

        </>
    )
}
