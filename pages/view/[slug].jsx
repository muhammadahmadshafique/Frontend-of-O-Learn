import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Progress, Tooltip } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { Spin } from "antd";
import styles from "../../styles/LessonAdd.module.css";
import { Button, Modal, Input, TextArea } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function LessonAdd() {
  const { TextArea } = Input;

  const router = useRouter();
  const { slug } = router.query;
  //states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [good, setGood] = useState(false);
  const [course, setCourse] = useState({});
  // const [lessontime, setLessontime] = useState(0);
  
  const [values, setValues] = useState({
    title: "",
    description: "",
    video: {},
    lessontotaltime:0,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  //Functions
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(course);

  const handleAddLesson = async (e) => {
    e.preventDefault();



    





    console.log(values);
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      console.log(data);
      setValues({ ...values, title: "", description: "", video: {} });
      setIsModalVisible(false);
      setUploadButtonText("Upload video");
      setProgress(0);
      setCourse(data);
      console.log(data);
      toast("Lesson added");
      setGood(false);
    } catch (err) {
      console.log(course);
      toast("Lesson add failed");
    }
  };

  const handleVideo = async (e) => {



    
    


    try {
      const getVideoDuration = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const media = new Audio(reader.result);
        media.onloadedmetadata = () => resolve(media.duration);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  
    const duration = await getVideoDuration(e.target.files[0]);
    console.log("durationnnnnnnnnnnn",duration)
  





      const file = e.target.files[0];
      setUploadButtonText(file.name);
      setUploading(true);

      const videoData = new FormData();
      videoData.append("video", file);
      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
            console.log(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      // once response is received
      toast("Video upload Successfully");
      setGood(true);
      setValues({ ...values, video: data });
      setValues({ ...values, lessontotaltime: duration })

      setUploading(false);
      console.log(values);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleVideoRemove = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        values.video
      );
      console.log(data);
      setGood(false);
      setValues({ ...values, video: {} });
      setUploading(false);
      setUploadButtonText("Upload another video");
      setProgress(0);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast("Video remove failed");
    }
  };








  
  const handlePublish = async (e, courseId) => {
    // console.log(course.instructor._id);
    // return;
    try {
      let answer = window.confirm(
        "Once you publish your course, it will be live in the marketplace for students to enroll."
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      // console.log("COURSE PUBLISHED RES", data);
      toast("Congrats. Your course is now live in marketplace!");
      
    } catch (err) {
      toast("Course publish failed. Try again");
    }
  };

  const handleUnpublish = async (e, courseId) => {
    // console.log(slug);
    // return;
    try {
      let answer = window.confirm(
        "Once you unpublish your course, it will not appear in the marketplace for students to enroll."
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      toast("Your course is now removed from the marketplace!");
      setCourse(data);
    } catch (err) {
      toast("Course unpublish failed. Try again");
    }
  };

  console.log(values);
  console.log("fffffffffffffffffffffffffffffffffffF", values.lessontotaltime)

  return (
    <>
      <div className={styles.createhead}>Add Lessons in Course</div>
      <div className={styles.pubaa}>
        <div className={styles.singlemainfirst}>
          <div className={styles.singlemainfirstdiv}>
            {course && course.image && (
              <img src={course.image.Location} alt="" srcset="" />
            )}
            {course && <span>{course.category}</span>}
          </div>
          {course && (
            <h2 className={styles.singlemainfirsth2}>{course.name}</h2>
          )}
          <div className={styles.butttttttans}>
            <button className={styles.instructorbtn}>
            <Link href={`/edit/${slug}`}>
                            <a> Update </a>
                        </Link>
              
            </button>
            
            {course&& course.published && <button  onClick={(e)=> handleUnpublish(e,course._id)} className={styles.instructorbtn1}> UnPublish</button>}
            {course&& course.lessons&&  course.lessons.length>=5 && !course.published && <button onClick={(e)=> handlePublish(e,course._id)} className={styles.instructorbtn1}> Publish</button>}
            {course&& course.lessons&&  course.lessons.length<5 && <button className={styles.instructorbtn1}>Not Enough Lessons</button>}
          </div>
        </div>
        <div className={styles.coursedetailfirst}>
          <h2 className={styles.coursedetailfirstdetail}>Course Details</h2>
          {course && <p>{course.description}</p>}

          <div className={styles.coursedetailfirst}>
            <h2 className={styles.coursedetailfirstdetail}>
              Who this Course is for
            </h2>
            {course && <p>{course.whoisthiscoursefor}</p>}
          </div>
        </div>
      </div>

      <div className={styles.addles}>
        <button onClick={showModal} className={styles.btnaddlesson}>
          Add Lesson
        </button>
      </div>

      <div className={styles.singlemainsecond}>
        <div className={styles.btnaddlessonparadiv}>
          {course && (
            <p className={styles.btnaddlessonpara}>
              Total lesson : {course.lessons && course.lessons.length}{" "}
            </p>
          )}
        </div>

        {course &&
          course.lessons &&
          course.lessons.length > 0 &&
          course.lessons.map((lesson, index) => (
            <div key={lesson._id} className={styles.lessonandtitle}>
              <video className={styles.videoadj} controls>
                <source src={lesson&& lesson.video&&lesson.video.Location} type="video/mp4" />
              </video>
              <div className={styles.titleandless}>
                <p>{lesson.title}</p>
                <span>Lesson No : {index}</span>
              </div>
              <div className={styles.comple}>
            <img src="/comp.png" alt="" srcset="" />
          </div>
            </div>
            
          ))}
      

   
      </div>

      <>
        <Modal
          title="Add Lesson"
          visible={isModalVisible}
          footer={null}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form>
            <input
              type="text"
              className={styles.widthhhhcheck}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
              value={values.title}
              placeholder="Title of lesson"
            />
            <br />
            <br />
            <textarea
              className={styles.widthhhhcheck}
              cols="12"
              rows="12"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
              value={values.description}
              placeholder="Content"
            ></textarea>

            <br />
            <label className={styles.coursebutt}>
              {uploadButtonText}
              <input
                onChange={handleVideo}
                type="file"
                name="image"
                accept="video/*"
                hidden
                value={values.uploadButtonText}
              />
            </label>

            {progress > 0 && (
              <Progress
                className="d-flex justify-content-center pt-2"
                percent={progress}
                steps={10}
              />
            )}

            {good && (
              <button onClick={handleVideoRemove} className={styles.colorbtn1}>
                Delete Video
              </button>
            )}

            <button onClick={handleAddLesson} className={styles.colorbtn}>
              {uploading ? <Spin /> : "Save Lesson "}
            </button>
          </form>
        </Modal>
      </>
      






    </>
  );
}
