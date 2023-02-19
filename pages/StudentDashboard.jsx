import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
import Link from 'next/link'
import styles from "../styles/InstructorDashborad.module.css"

import UserRoute from "../components/protectedRoutes/protectedUser"


import axios from "axios";
export default function StudentDashboard() {


  
      const [courses, setCourses] = useState([]);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        loadCourses();
      }, []);
    
      const loadCourses = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/user-courses");
          setCourses(data);
          setLoading(false);
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      };




    
  return (
    <UserRoute> 
       

    <div className={styles.butttttttans}>
     <button className={styles.instructorbtn}>Student Dashboard</button>
    </div>



    <div className={styles.cards}>
     <div className={styles.carasolediv}>
         
         <img className={styles.carapic} src="/c1.png" alt="" srcset="" />
         <span className={styles.caraspan}>Web Design</span>
         <div className={styles.coursetit}>The Complete Web Design course</div>
         <div className={styles.todivs}>
             <div className={styles.todivsfirst}>
                 <img src="/view.png" alt="" srcset="" />
                 <p className={styles.fivek}>500k+</p>
             </div>
             <div className={styles.todivssec}>
                 <p className={styles.aik}>$105.00</p>
                 <img src="/view.png" alt="" srcset="" /> 

             </div>
         </div>
     </div>

     {courses&&courses.map((singlecourse) =>
             <Link href={`/coursetrue/${singlecourse.slug}`}>
         <div key={singlecourse.id} className={styles.carasolediv}>
   
          <a>Blog Post</a>
       
         <img className={styles.carapic} src={singlecourse && singlecourse.image &&singlecourse.image.Location} alt="" srcset="" /> 
         <span className={styles.caraspan}>{singlecourse && singlecourse.category}</span>
         <div className={styles.coursetit}>{singlecourse && singlecourse.name}</div>
         <div className={styles.todivs}>
             <div className={styles.todivsfirst}>
                 <img src="/view.png" alt="" srcset="" />
                 <p className={styles.fivek}>500k+</p>
             </div>
             <div className={styles.todivssec}>
                 <p className={styles.aik}>Enrolled</p>
                 <img src="/view.png" alt="" srcset="" />

             </div>
         </div>
     </div>
     </Link>
      )}


    

    





   





     </div>
     <div className={styles.loadmore}>
     <button className={styles.buttontext} type="submit">Load More</button>
     </div>
    



 </UserRoute>
  )
}
