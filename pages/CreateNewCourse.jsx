import { useState, useEffect } from "react";
import axios from "axios";
import styles from '../styles/CreateNewCourse.module.css'
import Link from 'next/link'
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

import { useRouter } from 'next/router'



export default function CreateNewCourse() {
    const router = useRouter() 
    // : "",
    // : "",
    // price: "9.99",
    // uploading: false,
    // paid: true,
    // category: "",
    // loading: false,

    //All States
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [whoisthiscoursefor, setWhoisthiscoursefor] = useState("");
    const [price, setPrice] = useState("9.99");
    const [paid, setPaid] = useState(true);
    const [category, setCategory] = useState('');
    const [uploading, setUploading] = useState(false);
    const [maxstudents, setMaxstudents] = useState(0);
    const [loading, setloading] = useState(false);
    


    
   








    const [image, setImage] = useState({});
    const [preview, setPreview] = useState("");
    const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

    console.log({name,description,whoisthiscoursefor,price,paid,category,maxstudents,image})
    
   
    const handleImage = async (e) => {
        
        if(e.target.files.length !== 0){     
        setPreview(window.URL.createObjectURL(e.target.files[0]));
        console.log(preview)
        setUploadButtonText(e.target.files[0].name);
          }
        // resize 
        Resizer.imageFileResizer(e.target.files[0], 720, 500, "JPEG", 100, 0, async (uri) => {
            try {
                let { data } = await axios.post("/api/course/upload-image", {
                    image: uri,
                });
                console.log("IMAGE UPLOADED", data);
                // set image in the state
                setImage(data);
                setloading(false)
            } catch (err) {
                console.log(err);
                setloading(false);
                toast("Image upload failed. Try later.");
            }
        });
    };

    const handleImageRemove = async () => {
        try {
            // console.log(values);
            setloading(true);
            const res = await axios.post("/api/course/remove-image", { image });
            setImage({});
            setPreview("");
            setUploadButtonText("Upload Image");
            setloading(false);
        } catch (err) {
            console.log(err);
            setloading(false);
            toast("Image upload failed. Try later.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("values");
            const { data } = await axios.post("/api/course", {
                image,name,description,whoisthiscoursefor,price,paid,category,maxstudents,
            });

            data && toast("Great! Now you can start adding lessons");
            router.push("/InstructorDashborad");
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
        if(event.target.value==="Free"){
            setPrice("0")
        }
        if(event.target.value==="Paid"){
            setPrice("9.99")
        }
      }


    return (
        <>
      
            <div className={styles.createhead}>Create New Course</div>
            <div className={styles.createcoursemain}>
                <div className={styles.createcoursemainfirst}>
                    <form className={styles.formArrange} >
                        <input onChange={(e)=>setName(e.target.value)} value={name} className={styles.allinputs} type="text" placeholder='Course Name' />
                        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} name="subject" placeholder="Write Description of course.." ></textarea>
                        <textarea onChange={(e)=>setWhoisthiscoursefor(e.target.value)} value={whoisthiscoursefor} name="subject" placeholder="Who this course is for" ></textarea>
                        <div className={styles.selectttt}>
                            <select 
                            onChange={event => handleChange(event)}
                             value={paid} 
                            className={styles.selecttttfisrt}>
                                <option value={true}>Paid</option>
                                <option value={false}>Free</option>
                            </select>
                            {paid && (
                                    <select value={price}
      
                                        onChange={(e) => setPrice(e.target.value)}
                                        
                                    >
                                    
                                        {children}
                                    </select>
                               
                            )}
                        </div>
                        
                        <input onChange={(e)=>setCategory(e.target.value)} value={category} className={styles.allinputs} type="text" placeholder='Catagory' />
                        <input onChange={(e)=>setMaxstudents(e.target.value)} value={maxstudents} className={styles.allinputs11} type="number" placeholder='Maximum Limit of students' />

                    </form>


                </div>
                <div className={styles.createcoursemainsecond}>
                    

                    <div className={styles.createcoursemainseconddiv}>
                        <label  className={styles.coursebutt} >{uploadButtonText}<input onChange={handleImage} type="file" name='image' accept='image/*' hidden /></label>
                        <img src={preview ? preview : "/createcourse.png" } alt="" srcset="" />
                        {preview ? (<span onClick={handleImageRemove} className={styles.deleteimgae}>Delete Image </span>): ""}
                    </div>


                    <button onClick={handleSubmit} className={styles.btnsaveandcontinue} type="submit">
                        
                            <a> {loading ? "Saving..." : "Save & Continue"}</a>
                        

                    </button>

                </div>
            </div>


        </>
    )
}
