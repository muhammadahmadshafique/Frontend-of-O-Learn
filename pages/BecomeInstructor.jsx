import React, { useState } from 'react'
import styles from "../styles/BecomeInstructor.module.css"
import axios from "axios"
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useContext } from "react";
import { Context } from "../context/index";
import { useEffect } from 'react';
import { DollarTwoTone } from '@ant-design/icons';
import { Button } from 'antd';
export default function BecomeInstructor() {


    // state
    const [loading, setLoading] = useState(false);
    const {
      state: { user },
    } = useContext(Context);
  
    const becomeInstructor = () => {
      // console.log("become instructor");
      setLoading(true);
      axios
        .post("/api/make-instructor")
        .then((res) => { 
          // console.log(res);
          window.location.href = res.data;
        })
        .catch((err) => {
          console.log(err.response.status);
          toast("Stripe onboarding failed. Try again.");
          setLoading(false); 
        });
    };









  return (
    <>

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3>Setup your Payout</h3>
            <span>To Create Courses Setup your payout</span>
        </div>
        
      </div>

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3>Elearning Partnership </h3>
            <p>You will get payment in your bank after 48 hours from strip account.</p>
        </div>
       
      </div>

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3>PayOut</h3>
            <p>Check Your Payouts</p>
        </div>
        
      </div>
      <div className={styles.payoutt}>
      <Button  onClick={becomeInstructor}  type="primary" >{loading ? "Processing..." : "Payout Setup"}</Button>
      </div>


    

    
    
    
    
    </>
  )
}
