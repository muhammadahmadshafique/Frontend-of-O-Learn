import React, { useState, useEffect } from "react";
import styles from "../styles/Courses.module.css";
import Link from "next/link";
import axios from "axios";
import { Progress } from 'antd';
import { toast } from "react-toastify";
import Icon, {  DollarTwoTone} from '@ant-design/icons';
import { Rating } from 'react-simple-star-rating'
import {useRouter} from 'next/router'
import { currencyFormatter } from "../utils/helpers";
import ReactPlayer from 'react-player'
var convert = require('convert-seconds');
export default function Courses() {
      const [rating, setRating] = useState(20) // initial rating value

      const router = useRouter()
      const [filteredData, setFilteredData] = useState([]);
      const [wordEntered, setWordEntered] = useState("");

      const [duration, setDuration]= useState(0);
      const [student, setStudent]= useState("");
      const [visible, setVisible] = useState(6);

      const [courses, setCourses]= useState([]);
      const [q, setQ]= useState("");
      console.log("hhhhhhhhhhhhhhhhhhhhhhhh",convert(duration).hours)
      

      const [lists, setLists] = useState([]);
  useEffect(() => {
    fetchcourses();
  }, []);

  const fetchcourses = async () => {
    const { data } = await axios.get(`/api/courses`);
    setCourses(data);

    
  };

  
  





   // Catch Rating value
   const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }





 

 const handleDuration = (newduration) => {
    console.log('onDuration', newduration)
    setDuration(duration+newduration)
  }

  // console.log("OOOOOOOOOOOOOOOOOOOOOOOyyyy",duration)
  



  const loadMore = () => {
    setVisible(visible + 6);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/Search',
      query: {q: q},
      
    })
  }

  const clickfunction = (e) => {

    console.log(">...>>>>>>>>>>>>",e.target.innerText)
   
    setQ(e.target.innerText)
    console.log(q)
    router.push({
      pathname: '/Search',
      query: {q: e.target.innerText},
      
    })
  }


  const handleFilter = (event) => {
    setQ(event.target.value) 
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = courses && courses.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  

  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>",courses && courses) 
  return (
    <>
   
      <div className={styles.cirleinput}>

      <div  className={styles.cirleandinputa}>
      <form onSubmit={handleSubmit} >
      <input onChange={handleFilter} type="text" className={styles.cssinput} />

     </form>




        <Link  href={{ pathname: '/Search', query: { q: q} }}>
          <img className={styles.btnn}  src="/go.png" alt="" srcset="" />
        </Link>
      </div>


        <div className={styles.upperhand}>


        {filteredData&& filteredData.map((onecoursesname)=>(
                <div key={onecoursesname._id}  className={styles.suggest}>
                <p onClick={clickfunction}>{onecoursesname.name}</p>
                



              
              



               
                </div>

              ))}
        </div>



       

      </div>
    
      
              
     
      {/* <ReactPlayer onDuration={handleDuration}  controls={true}  url='https://media.w3.org/2010/05/sintel/trailer_hd.mp4' /> */}
      <div className={styles.hidden} >{duration} seconds</div>
      <div className={styles.cards}>
        {courses&& courses.slice(0, visible).map((course) => (
         <>
          <div key={course._id} className={styles.carasolediv}>
           {!course.maxstudents==0 &&    <div className={styles.sdf} >
              {/* console.log(course.maxstudents)                                 

              console.log(course.student) */}
              
           <Progress className={styles.sdff} type="circle" strokeWidth={8} percent={((course.enrolledstudents/course.maxstudents)*100).toFixed(0)} width={28} />

             <span className={styles.sdfs}>Booked</span>
             </div>
}
            <Link href={`/course/${course.slug}`}>
              <img className={styles.carapic} src={course &&course.image&& course.image.Location} alt="" srcset="" />
            </Link>

            <div className={styles.spandiv}>
            <span className={styles.caraspan}>{course.category}</span>
            <span className={styles.caraspan}>{course.instructor.name}</span>
            
            </div>
           
              
            <div className={styles.coursetit}>
            <p>{course.name}</p>
            
              {convert(course.coursetotaltime).hours?  <p>{convert(course.coursetotaltime).hours} Hours</p>: convert(course.coursetotaltime).minutes? <p>{convert(course.coursetotaltime).minutes} minutes</p>: <p>{convert(duration).seconds} Seconds</p>  }
                          
               

            </div>
            <div className={styles.rating}>
              <Rating  ratingValue={course && course.ratings/course.numOfReviews} size={18} readonly={true}/* Available Props */ />
              <span>({course && course.numOfReviews} Ratings)</span> 
              </div>
            <div className={styles.todivs}>
              <div className={styles.todivsfirst}>
                <img src="/view.png" alt="" srcset="" />
                
                <p  className={styles.fivek}>Stu:{course.enrolledstudents}</p>

                
              </div>

              <div className={styles.todivssec}>

                
               
                
                <p className={styles.aik}>{course.paid? currencyFormatter({
                  amount:  Number(course.price.substring(1)),
                  currency: "usd",
                }):"Free"}</p>
                {/* <img src="/view.png" alt="" srcset="" /> */}
                <DollarTwoTone style={{fontSize: '26px'}} />
              </div>
            </div>
          </div>
          </>
        ))}
      </div>
      
      <div className={styles.loadmore}>
     
      {visible < courses.length && (
        <button className={styles.buttontext} type="submit" onClick={loadMore}>Load 5 More</button>
      )}

       

      </div>
 
    </>
  );
}

