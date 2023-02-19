import styles from "../../styles/Singlecourse.module.css";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { withRouter, useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from "react";
import { Context } from "../../context";

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
    const [loading, setLoading] = useState(false);
    const [currentlesson, setCurrentlesson]= useState({});
    const [enrolled, setEnrolled] = useState({});

  
  
 
  useEffect(() => {
    fetchcourse();
  }, []);

  const fetchcourse = async () => {
    const { data } = await axios.get(
      `http://localhost:8000/api/course/${slug}`
    );

    setCourse(data);
  };

  console.log("courseeeeeeeee", course);

  var x = "/media/cc0-videos/flower.mp4"
  console.log("dddddddddddddddddddd", x);

console.log(currentlesson)
const test=(lesson)=>{
    if(lesson.free_preview){
        setCurrentlesson(lesson)

    }else{
        toast("Purchase this course")
    }
    
    
}


if(course){
  console.log("whatttttttttt",`/api/check-enrollment/${course._id}`)
}



useEffect(() => {
  if (user && course) checkEnrollment();
}, [user, course]);

const checkEnrollment = async () => {
  
  if(course && course._id){
    let courseID= course && course._id
    const { data } = await axios.get(`/api/check-enrollment/${courseID}`);
    console.log("CHECK ENROLLMENT", data);
  setEnrolled(data); 
  }
  
};

// console.log("enrolledenrolledenrolledenrolledenrolled",enrolled.status) 












const handlePaidEnrollment = async () => {
  // console.log("handle paid enrollment");
  try {
    setLoading(true);
    // check if user is logged in
    if (!user) router.push("/login");
    // check if already enrolled
    if (enrolled.status)
      return router.push(`/coursetrue/${enrolled.course.slug}`);
    const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    stripe.redirectToCheckout({ sessionId: data });
  } catch (err) {
    toast("PAID ENROLLMENT ERR");
    console.log(err);
    setLoading(false);
  }
};




const handleFreeEnrollment = async (e) => {
  // console.log("handle free enrollment");
  e.preventDefault();
  try {
    // check if user is logged in
    if (!user) router.push("/login");
    // check if already enrolled
    if (enrolled.status)
      return router.push(`/coursetrue/${enrolled.course.slug}`);
    setLoading(true);
    const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
    toast(data.message);
    setLoading(false);
    toast("Successfully Enrolled");
    router.push(`/coursetrue/${data.course.slug}`);
  } catch (err) {
    toast("Enrollment failed. Try again.");
    console.log(err);
    setLoading(false);
  }
};











  return (
    <> 
      <div className={styles.singlemain}>
        <div className={styles.singlemainfirst}> 
          <div className={styles.singlemainfirstdiv}>
             <video className={styles.elementsty}  src={currentlesson &&currentlesson.video  ?currentlesson.video.Location&& currentlesson.video.Location: course&&course.lessons&&course.lessons[0].video&& course.lessons[0].video.Location&& course.lessons[0].video.Location} controls alt="" srcset="" /> 
            
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
                    lesson  && lesson.free_preview  && lesson.video.Location
                }
                type="video/mp4"
              />
            </video>
            <div className={styles.titleandless}>
              <p>{lesson.title}</p>
              
              <span>Lesson No : {index+1}</span>
              
            </div>

            {lesson.free_preview&&<span className={styles.freespan} >Preview</span>}
            
            <div className={styles.comple}>
              <img src="/comp.png" alt="" srcset="" />
              
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

          {/* <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div>


                    <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div>


                    <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div>

                    <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div>

                    <div className={styles.lessonandtitle}>
                        <img src="/lesson.png" alt="" srcset="" />
                        <div className={styles.titleandless}>
                            <p>React Native With Firebase</p>
                            <span>Lesson No : 1</span>
                        </div>
                        <div className={styles.comple}><img src="/comp.png" alt="" srcset="" /></div>
                    </div> */}
        </div>
      </div>

      <div className={styles.coursedetail}>
        <div className={styles.coursedetailfirst}>
          <h2 className={styles.coursedetailfirstdetail}>Course Details</h2>
          <p>{course && course.description}</p>

          <div className={styles.coursedetailfirst}>
            <h2 className={styles.coursedetailfirstdetail}>
              Who this Course is for
            </h2>
            <p>{course && course.whoisthiscoursefor}</p>
          </div>
        </div>

        <div className={styles.coursedetailsecond}>
          <div className={styles.coursedetailsecondadj}>
            <div className={styles.coursedetailseconddiv}>
              <div>
                <span className={styles.courseleftsidespan}>Course Name</span>
                <p className={styles.courseleftsidepara}>
                  {course && course.name}
                </p>
              </div>
              <span>{course && course.paid ? "Paid" : "Free"}</span>
            </div>
            <div>
              <span className={styles.courseleftsidespan}>
                Course Created By:{" "}
              </span>
              <p className={styles.courseleftsidepara}>
                {course && course.instructor && course.instructor.name}
              </p>
            </div>

            <div>
              <span className={styles.courseleftsidespan}>
                IS It Paid Or Free
              </span>
              <p className={styles.courseleftsidepara}>
                This Course is {course && course.paid ? "Paid" : "Free"}
              </p>
            </div>
            <div>
              <span className={styles.courseleftsidespan}>Last updated</span>
              <p className={styles.courseleftsidepara}>{course&& course.updatedAt}</p>
            </div>
          </div>
          <button onClick={course&&course.paid ? handlePaidEnrollment : handleFreeEnrollment} class={styles.btaaa} type="submit">
            
              { enrolled&& enrolled.status? "Go to the course":course&& course.paid? "Paid":"Free" }
           
          </button>
        </div>
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
