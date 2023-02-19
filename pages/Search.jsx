import React, { useState, useEffect } from "react";
import styles from "../styles/Courses.module.css";
import Link from "next/link";
import axios from "axios";
import { currencyFormatter } from "../utils/helpers";
import { useRouter } from 'next/router'
export default function Courses() {

      const router = useRouter()
 
  

  console.log(router.query)
  const [courses, setCourses] = useState([]);
      const query = router&& router.query.q;

  useEffect(() => {
    const fetchVideos = async () => {
      // http://localhost:3000/api/Search?q=Game
      const res = await axios.get(`http://localhost:3000/api/Search?q=${query}`);
      console.log("This is Response Data",res.data)
      setCourses(res.data);
    };
    fetchVideos();
  }, [query]);


  console.log(courses)

 

  


  
  return (
    <>
      <div className={styles.checker}>
      {courses.length>0 ? router&& router.query.q.toUpperCase() :"No Course Found"}

      </div>
 
      <div className={styles.cards}>
        {courses&& courses.map((course) => (
          <div key={course._id} className={styles.carasolediv}>
            <Link href={`/course/${course.slug}`}>
              <img className={styles.carapic} src={course.image.Location} alt="" srcset="" />
            </Link>

            <div className={styles.spandiv}>
            <span className={styles.caraspan}>{course.category}</span>
            <span className={styles.caraspan}>{course.instructor.name}</span>
            
            </div>
            <div className={styles.coursetit}>
            {course.name}
          
            </div>
            <div className={styles.todivs}>
              <div className={styles.todivsfirst}>
                <img src="/view.png" alt="" srcset="" />
                <p className={styles.fivek}>500k+</p>
              </div>
              <div className={styles.todivssec}>
               
                
               
                
                <p className={styles.aik}>{course.paid? currencyFormatter({
                  amount:  Number(course.price.substring(1)),
                  currency: "usd",
                }):"Free"}</p>
                <img src="/view.png" alt="" srcset="" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.loadmore}>
        <button className={styles.buttontext} type="submit">
          Load More
        </button>
      </div> 



      {/* <div>
  <input type="file" onChange={handleChange} />
  <p id="duration">Duration: </p>
</div> */}











      
    </>
  );
}

