import styles from "../../styles/Singlecourse.module.css";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { Rating } from 'react-simple-star-rating'

import { Context } from "../../context";
import { Progress } from 'antd';
import { loadStripe } from "@stripe/stripe-js";
export default function Singlecourse() {
   
  const router = useRouter();
  const { slug } = router.query;
      // context
    const {
      state: { user },
    } = useContext(Context);


    //All states 
    const [course, setCourse] = useState({});
    const [submitted, setSubmitted] = useState(false);

    
    const [rating, setRating] = useState(0) // initial rating value

    const [loading, setLoading] = useState(false);
    const [currentlesson, setCurrentlesson]= useState({});
    const [enrolled, setEnrolled] = useState({});
    const [completedLessons, setCompletedLessons] = useState([]);
    // force state update
    const [updateState, setUpdateState] = useState(false);
  
  
 
  useEffect(() => {
    fetchcourse();
  }, []);

  const fetchcourse = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/course/${slug}`
    );
    setCourse(data);
  };

//   console.log("dddddddddddddddddddd", course.lessons[0].video.Location);




const test=(lesson)=>{
    
        setCurrentlesson(lesson)
       

    
    
    
}

useEffect(() => {
  if (course) loadCompletedLessons();
}, [course]);



useEffect(() => {
  if (course && course._id) loadRating();
}, [course && course._id]);


const loadCompletedLessons = async () => {
  const { data } = await axios.post(`/api/list-completed`, {
    courseId: course._id,
  });
  console.log("COMPLETED LESSONS => ", data);
  setCompletedLessons(data);  
  
};


const loadRating = async () => {
  const { data } = await axios.post(`/api/rating-completed`, {
    courseId: course._id,
  });
  console.log("COMPLETED ratttttttttttttttttttttttting => ", data.rating.rating);
  setRating(data.rating.rating);  
};

const markCompleted = async (index) => {
  console.log(course.lessons[index]._id)

  const { data } = await axios.post(`/api/mark-completed`, {
    courseId: course._id,
    lessonId: course.lessons[index]._id,
  });
  console.log(data);
  setCompletedLessons([...completedLessons, course.lessons[index]._id]);
};

const handleRating = async (rate) => {
  // console.log(course.lessons[index]._id)
 
  if(rate){

    const { data } = await axios.post(`/api/mark-rating`, {
      courseId: course._id,
      rating:rate ,
    });
    console.log("datadatadata",data);
    setRating(data.rating);
   
  }

 
};


console.log("ratingratingrating",rating)


const markIncompleted = async (index) => {
  // console.log("Course is",course)
  // console.log("lesson is",course.lessons)
  // console.log("Index is",index)
  // console.log("Course is",course)
  // console.log("Single lesson is ",course.lessons[index])
  // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",course.lessons[index]._id)
  // console.log("Type of",typeof course.lessons[index]._id)
  let singleId=course.lessons[index]._id
  if(course &&course.lessons&& course.lessons[index]._id){
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: singleId,
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(singleId);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  }else{
    console.log("Waitttt Please")
  }
};





















// console.log("COMPLETED LESSONS...........",completedLessons)
 // Catch Rating value
//  const handleRating = (rate) => {
//   setRating(rate)
//   setSubmitted(true)
//   // other logic
// }






  return (
    <> 
      <div className={styles.singlemain}>
        <div className={styles.singlemainfirst}> 
          <div className={styles.singlemainfirstdiv}>
             <video className={styles.elementsty}  src={currentlesson &&currentlesson.video ?currentlesson.video.Location: course&&course.lessons&& course.lessons[0].video&& course.lessons[0].video.Location} controls alt="" srcset="" /> 
            
            <span>{course && course.category}</span>
          </div>
          <h2 className={styles.singlemainfirsth2}>{course && course.name}</h2>
        </div>
        <div className={styles.singlemainsecond}>
          {/* <div className={styles.lessonandtitle}>
            <img src="/lesson.png" alt="" srcset="" />
            <div className={styles.titleandless}>
              <p>React Native With Firebase</p>
              <span>Lesson No : 1</span>
            </div>
            <div className={styles.comple}>
              <img src="/comp.png" alt="" srcset="" />
            </div>
          </div> */}

          

         
            {course&& course.lessons&&course.lessons.map((lesson,index=-1) => (
             
              <div onClick={(e)=>test(lesson)} key={lesson.id} className={styles.lessonandtitle}>
            {/* <img src="/lesson.png" alt="" srcset="" />  */}
            <video className={styles.cdc}  controls>
              <source 
                src={
                    lesson  && lesson.video  && lesson.video.Location
                }
                type="video/mp4"
              />
            </video>
            <div className={styles.titleandless}>
              <p>{lesson.title}</p>
              
              <span>Lesson No : {index+1}</span>
              
            </div>

            
            
            <div className={styles.comple}>
                
              
            
                 
                  
                 { completedLessons&& completedLessons.includes(lesson._id) ? (
                    <img  onClick={(e)=> markIncompleted(index)}   src="/comp.png" alt="" srcset="" />
                   
                 
                  
                ) : (
                  <img onClick={(e)=>markCompleted(index)}  src="/un.png" alt="" srcset="" />
                  
                )}
                 
                  
                
            </div>
          </div>
            ))}
         

          {/* <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div> */}

          
        </div>
      </div>

      <div className={styles.courseCompletedp}>
                <p>Course Completed </p>  
            </div>
            <div className={styles.courseCompletedbar}> 
              {course &&course.lessons && completedLessons &&<Progress type="circle" percent={(completedLessons.length/course.lessons.length)*100} />}
             
             
            </div>                                                                                                                             

            <div className={styles.rating}>

              {course && course.lessons &&(completedLessons.length/course.lessons.length)*100==100  &&  <Rating onClick={handleRating}  readonly={rating>0 ? true: false}  ratingValue={rating} size={29} /* Available Props */ />}
              
              
              </div>

     
    </>
  );
}

// export async function getServerSideProps({ query }) {
//     const { data } = await axios.get(
//       `${process.env.API}/course/${query.slug}`
//     );
//     return {
//       props: {
//         course: data,
//       },
//     };
//   }
