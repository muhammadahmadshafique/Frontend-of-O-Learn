import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/InstructorDashborad.module.css";
import Link from "next/link";
import { DeleteOutlined } from '@ant-design/icons';
import ProtectedInstructor from "../components/protectedRoutes/ProtectedInstructor";
import { ToastContainer, toast } from 'react-toastify';
export default function InstructorDashborad() {
  const [courses, setCourses] = useState([]);
  const [visible, setVisible] = useState(6);
  

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  console.log("courses are of this instructor", courses);


  const deletecourse= async (courseid)=> {
  const { data } =await axios.delete(`/api/deletecourse/${courseid}`);
  if(data.ok){

    const array = courses.filter(function(s) { return s._id != courseid });
    setCourses(array);
    // courses.filter(element => {return element._id !=courseid})
    
    toast("Course has been deleted")
  } 
  else{
    toast("Error deleting course")

  }
    
  }

  const loadMore = () => {
    setVisible(visible + 6);
  };


  return (
    <ProtectedInstructor>
      <div className={styles.butttttttans}>
        <button className={styles.instructorbtn}>Dashboard</button>
        <button className={styles.instructorbtn}>
          <Link href="/CreateNewCourse">
            <a>Create Course</a>
          </Link>
        </button>
        <button className={styles.instructorbtn}>
          <Link href="/InstructorRevenue">
            <a>Revenue</a>
          </Link>
        </button>
      </div>

      <div className={styles.cards}>
        <div className={styles.carasolediv}>
          <span className={styles.publisheddd}>Published</span>
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

        {courses && courses.slice(0, visible).map((onecourse) => (
          <div key={onecourse._id} className={styles.carasolediv}>
            <span className={styles.publisheddd}> 
            
            {onecourse.lessons.length<5? (<p className={styles.upperdiv}>At least 5 lessons are required to publish this course</p>):
              
              (onecourse.published ? (<p className={styles.upperdiv}>Your course is live in E-Learning</p>): (<p className={styles.upperdiv}>You course is ready to publish</p>))}


              
              </span>
              <Link href={`/view/${onecourse.slug}`}>
            <img className={styles.carapic} src={onecourse&& onecourse.image&& onecourse.image.Location} alt="" srcset="" />
            </Link>
            <span className={styles.caraspan}>{onecourse.category}</span>
            <div className={styles.coursetit}>
              {onecourse.name}
              
            </div>
            
            
            <div className={styles.todivs}>
              <div className={styles.todivsfirst}>
                <img src="/view.png" alt="" srcset="" />
                <p className={styles.fivek}>500k+</p>
              </div>
              <div className={styles.todivssec}>
                <p className={styles.aik}> {onecourse.price==="0" ? "Free":onecourse.price}</p>
                <img src="/view.png" alt="" srcset="" />
              </div>
              
            </div>
            <div>
              <div className={styles.lessonslength}>
                <p>Lessons</p>
                <span>{onecourse.lessons.length} </span>
                <DeleteOutlined onClick={(e)=>deletecourse(onecourse._id)} style={{ fontSize: '16px'}} />
              </div>
              <div>
             
                
                
                
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.loadmore}>

      {visible < courses.length && (
        <button className={styles.buttontext} type="submit" onClick={loadMore}>Load 5 More</button>
      )}



        
      </div>
    </ProtectedInstructor>
  );
}
