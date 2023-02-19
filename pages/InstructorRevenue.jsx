import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/InstructorRevenue.module.css"
import { DollarTwoTone } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import { stripeCurrencyFormatter } from "../utils/helpers";
export default function InstructorRevenue() {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);


    
  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  }
  

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout settings. Try later.");
    }
  };





 
    console.log("aaaaaaaaaaaaa are",balance&&balance.pending&&balance.pending[0]&&balance.pending[0].amount)
    // console.log("aaaaaaaaaaaaa", balance&& balance.pending[0].currency)
    // console.log("bbbbbbbbbbbbbbbbbbbbbbb",stripeCurrencyFormatter("12"))

  






  return (
    <>

      

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3>Revenue Report</h3>
            <span>You will Get Paid from Stripe to Your bank account After 24 Hours</span>
        </div>
        <div className={styles.priceandlogo}>
           
        <DollarTwoTone style={{ fontSize: 31, color: "#77C0CC" }} />
        </div>
      </div>

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3>Pending Balance in {balance&&balance.pending&&balance.pending[0]&&balance.pending[0].currency} </h3>
            <p>For last 48 Hours</p>
        </div>
        <div className={styles.priceandlogo}>
            <span> {balance&&balance.pending&&balance.pending[0]&&balance.pending[0].amount}</span>
        <DollarTwoTone style={{ fontSize: 31, color: "#77C0CC" }} />
        </div>
      </div>

      <div className={styles.mainrevenue}>
        <div className={styles.mainrevenuefirst}>
            <h3  onClick={handlePayoutSettings}>PayOut</h3>
            <p  onClick={handlePayoutSettings}>Check Your Payouts</p>
            {/* {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span key={i} className="float-right">
                    {bp}
                  </span>
                ))} */}

{/* {balance&& balance.pending.map(home => <div>{home}</div>)} */}
        </div>
        <div className={styles.priceandlogo}>
           
        <DollarTwoTone style={{ fontSize: 31, color: "#77C0CC" }} />
        </div>
      </div>

    

    
    
    
    
    </>
  )
}
