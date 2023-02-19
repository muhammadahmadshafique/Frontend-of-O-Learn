import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/CreateNewCourse.module.css";
import Link from "next/link";
import { Button, Modal, Input, TextArea } from "antd";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import styleszzz from "../../styles/LessonAdd.module.css";
import { Switch, Spin } from "antd";
import { List, Avatar } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

import { Progress, Tooltip } from "antd";

export default function CreateNewCourse() {
  const { Item } = List;
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState({});
  const [good, setGood] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [maxstudents, setMaxstudents] = useState("");
  // : "",
  // : "",
  // price: "9.99",
  // uploading: false,
  // paid: true,
  // category: "",
  // loading: false,

  //All States
  const [name, setName] = useState("");
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setWhoisthiscoursefor(data.whoisthiscoursefor);
      setPaid(data.paid);
      setCategory(data.category);
      setImage(data.image);
      setPrice(data.price);
      setMaxstudents(data.maxstudents)
      setCourse(data);
    }
  };

  const [description, setDescription] = useState("");
  const [whoisthiscoursefor, setWhoisthiscoursefor] = useState("");
  const [price, setPrice] = useState("9.99");
  const [paid, setPaid] = useState(true);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  

  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [loading, setloading] = useState(false);

  const [values, setValues] = useState({
    title: "",
    description: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonTextVideo, setUploadButtonTextVideo] =
    useState("Upload Video");
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState({});

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

  console.log({
    name,
    description,
    whoisthiscoursefor,
    price,
    paid,
    category,
    image,
    maxstudents,
  });

  const handleImage = (e) => {
    if (e.target.files.length !== 0) {
      setPreview(window.URL.createObjectURL(e.target.files[0]));
      console.log(preview);
      setUploadButtonText(e.target.files[0].name);
    }

    // resize
    Resizer.imageFileResizer(
      e.target.files[0],
      720,
      500,
      "JPEG",
      100,
      0,
      async (uri) => {
        try {
          let { data } = await axios.post("/api/course/upload-image", {
            image: uri,
          });
          console.log("IMAGE UPLOADED", data);
          toast("IMAGE UPLOADED.");
          // set image in the state
          setImage(data);
          setloading(false);
        } catch (err) {
          console.log(err);
          setloading(false);
          toast("Image upload failed. Try later.");
        }
      }
    );
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setloading(true);
      const res = await axios.post("/api/course/remove-image", { image });
      toast("Image Remove Successfully");
      setImage({});
      setPreview("");
      setUploadButtonText("Upload New Image");
      setloading(false);
    } catch (err) {
      console.log(err);
      setloading(false);
      toast("Image Removed Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("values");
      const { data } = await axios.put(`/api/course/${slug}`, {
        image,
        name,
        description,
        whoisthiscoursefor,
        price,
        paid,
        category,
        maxstudents,
      });

      toast("Course updated!");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<option key={i.toFixed(2)}>${i.toFixed(2)}</option>);
  }

  const handleChange = (event) => {
    setPaid(!paid);
    // console.log(event.target.value)
    if (event.target.value === "Free") {
      setPrice("0");
    }
    if (event.target.value === "Paid") {
      setPrice("9.99");
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = course.lessons;

    let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setCourse({ ...current, lessons: [...allLessons] });
    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...course,
      image,
    });
    // console.log("LESSONS REARRANGED RES => ", data);
    toast("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    console.log(course);

    let allLessons = course.lessons;

    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setCourse({ ...current, lessons: allLessons });

    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  /**
   * lesson update functions
   */

  const handleVideo = async (e) => {
    // remove previous
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/video-remove/${course.instructor._id}`,
        current.video
      );
      console.log("REMOVED ===> ", res);
    }
    // upload
    const file = e.target.files[0];
    console.log(file);
    setUploadButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData();
    videoData.append("video", file);
    videoData.append("courseId", course._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${course.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) =>
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    // once response is received
    console.log(data);

    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    console.log("CURRENT", current);
    // console.log("**SEND TO BACKEND**");
    // console.table({ values });
    let { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    // console.log("LESSON UPDATED AND SAVED ===> ", data);
    setUploadButtonText("Upload video");
    setProgress(0);
    setIsModalVisible(false);
    //Even if i set setcourse(data) and refresh then we are good but we want to change ui immediately
    //so we will not do like this but below code
    // update lessons
    if (data.ok) {
      let arr = course.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast("Lesson updated");
    }
  };

  return (
    <>
      <div className={styles.createhead}>Update Course</div>
      <div className={styles.createcoursemain}>
        <div className={styles.createcoursemainfirst}>
          <form className={styles.formArrange}>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={styles.allinputs}
              type="text"
              placeholder="Course Name"
            />
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="subject"
              placeholder="Write Description of course.."
            ></textarea>
            <textarea
              onChange={(e) => setWhoisthiscoursefor(e.target.value)}
              value={whoisthiscoursefor}
              name="subject"
              placeholder="Who this course is for"
            ></textarea>
            <div className={styles.selectttt}>
              <select
                onChange={(event) => handleChange(event)}
                value={paid}
                className={styles.selecttttfisrt}
              >
                <option value={true}>Paid</option>
                <option value={false}>Free</option>
              </select>
              {paid && (
                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  {children}
                </select>
              )}
            </div>

            <input
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className={styles.allinputs}
              type="text"
              placeholder="Catagory"
            />
    <input onChange={(e)=>setMaxstudents(e.target.value)} value={maxstudents} className={styles.allinputs11} type="number" placeholder='Maximum Limit of students' />

          </form>
        </div>
        <div className={styles.createcoursemainsecond}>
          <div className={styles.createcoursemainseconddiv}>
            <label className={styles.coursebutt}>
              {uploadButtonText}
              <input
                onChange={handleImage}
                type="file"
                name="image"
                accept="image/*"
                hidden
              />
            </label>
            <img src={image && image.Location} alt="" srcset="" />
          </div>

          <button
            onClick={handleSubmit}
            className={styles.btnsaveandcontinue}
            type="submit"
          >
            <a> {loading ? "Saving..." : "Update & Save"}</a>
          </button>
        </div>
      </div>

      <div
        style={{ "margin-top": "12rem" }}
        className={styleszzz.singlemainsecond}
      >
        <div className={styleszzz.btnaddlessonparadiv}>
          {course && (
            <p className={styleszzz.btnaddlessonpara}>
              Total lesson : {course.lessons && course.lessons.length}{" "}
            </p>
          )}
        </div>

        {course && course.lessons && course.lessons.length > 0 && (
          <div className={styles.ssssss}>
            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={course && course.lessons}
              renderItem={(item, index) => (
                <Item
                  draggable
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <Item.Meta
                    onClick={() => {
                      setIsModalVisible(true);
                      setCurrent(item);
                      console.log("kdfgadahjkdgjhkdghjkdghadgk", current.title);
                    }}
                    avatar={
                      <Avatar
                        size={80}
                        shape="square"
                        src={
                          <video
                            src={item && item.video&& item.video.Location}
                            controls
                            style={{ width: 100 }}
                          />
                        }
                      />
                    }
                    title={item.title}
                  ></Item.Meta>

                  <DeleteOutlined
                    onClick={() => handleDelete(index)}
                    className="text-danger float-right"
                  />
                </Item>
              )}
            ></List>
          </div>
        )}
      </div>

      <>
        <Modal
          title="Update Lesson"
          visible={isModalVisible}
          footer={null}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form>
            <input
              type="text"
              className={styleszzz.widthhhhcheck}
              onChange={(e) =>
                setCurrent({ ...current, title: e.target.value })
              }
              value={current.title}
              placeholder="Title of lesson"
            />
            <br />
            <br />
            <textarea
              className={styleszzz.widthhhhcheck}
              cols="12"
              rows="12"
              value={current.description}
              onChange={(e) =>
                setCurrent({ ...current, description: e.target.value })
              }
              placeholder="Content"
            ></textarea>

            <br />
            <label className={styleszzz.coursebutt}>
              Upload Video
              <input
                onChange={handleVideo}
                type="file"
                name="image"
                accept="video/*"
                hidden
              />
            </label>

            {progress > 0 && (
              <Progress
                className="d-flex justify-content-center pt-2"
                percent={progress}
                steps={10}
              />
            )}
            {!uploading && current.video && current.video.Location && (
              <ReactPlayer url={current.video.Location} controls />
            )}

            <div className={styleszzz.checkkpre}>
              <p>Preview</p>
              <Switch
                disabled={uploading}
                checked={current.free_preview}
                name="fee_preview"
                onChange={(v) => setCurrent({ ...current, free_preview: v })}
              />
            </div>

            <button onClick={handleUpdateLesson} className={styleszzz.colorbtn}>
              {uploading ? <Spin /> : "Update Lesson "}
            </button>
          </form>
        </Modal>
      </>
    </>
  );
}
