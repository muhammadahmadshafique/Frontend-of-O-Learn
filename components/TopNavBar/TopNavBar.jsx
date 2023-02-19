
import styles from "./TopNavBar.module.css"
import { useState } from "react";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useContext } from "react";
import { Context } from "../../context/index";
import axios from "axios"
import { Spin } from 'antd';
import { ToastContainer, toast } from 'react-toastify';



const TopNavbar = () => {
    const router = useRouter();

      //Context Api Things
  const {state,dispatch}= useContext(Context);
  // console.log("state is ", state);
  const {user}=state;
//   console.log(user.name)


const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/Signin");
  };


    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link href="/StudentDashboard">
                            <a>DashBoard</a>
                        </Link>
                    ),
                },

            ]}
        />
    );









    const [open, setOpen] = useState(false);

    return (
        <div className={styles.firsttopbar}>
            <div className={styles.secondtopbar}>

                <div className={styles.firstchild}>
                    <Link href="/">
                        <img className={styles.imagesize} src="/gfgLogo.png" alt="logo" srcset="" />
                    </Link>

                </div>
                <div className={styles.secondchild} >
                    <ul className={styles.ul}>
                        <div className={styles.ulfirst}>
                            {user && user.role  && user.role.includes("Instructor") ?  
                            (<li className={styles.teacher}>
                                <Link href="/CreateNewCourse">
                                    <a>Create Course</a>
                                </Link>
                            </li>)
                            
                            :
                            (<li className={styles.teacher}>
                                <Link href="/BecomeInstructor">
                                    <a> Become Teacher</a>
                                </Link>
                            </li>)
                            }
                            <li className={styles.fontresize}>
                                
                                <Link href="/Courses">
                                    <a> Courses</a>
                                </Link>
                                
                            </li>
                            {user && user.role  && !user.role.includes("Instructor") && (
                                <li className={styles.fontresize}>
                                
                                <Link href="/FreeCourses">
                                    <a>Free Courses</a>
                                </Link>
                            </li>
                            )}
                             {user && user.role  && !user.role.includes("Instructor") && (
                                <li className={styles.fontresize}>
                                
                                <Link href="/PaidCourses">
                                    <a>Paid Courses</a>
                                </Link>
                            </li>
                            )}
                             {user && user.role  && user.role.includes("Instructor") && (
                                <li className={styles.fontresize}>
                                
                                <Link href="/InstructorDashborad">
                                    <a>Instructor</a>
                                </Link>
                            </li>
                            )}
                            {user&&(<li className={styles.fontresize}>
                                
                               
                                <a onClick={logout}>Logout</a>

                        </li>)}
                            {!user&&(<li className={styles.fontresize}>
                                
                                <Link href="/Signin">
                                    <a>Login</a>
                                </Link>
                            </li>)}
                            
                        </div>
                        {user&&(<button className={styles.btn}>
                            <Dropdown overlay={menu}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        {user &&user.name}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </button>)}
                    </ul>

                    <div className={styles.hambarger} onClick={() => setOpen(!open)}>
                        <div className={styles.lines}></div>
                        <div className={styles.lines}></div>
                        <div className={styles.lines}></div>
                    </div>

                    <ul onClick={() => setOpen(false)} className={styles.menu} style={{ right: open ? "0px" : "-50vw" }}>

                        <li className={styles.menuItem}>
                            
                                {user && <Link href="/CreateNewCourse">
                                    <a className={styles.vivo}> Become Teacher</a>
                                </Link>}
                        </li>
                        <li className={styles.menuItem}>
                                <Link href="/Courses">
                                    <a> Courses</a>
                                </Link>
                        </li>
                        <li className={styles.menuItem}>
                                <Link href="/FreeCourses">
                                    <a>Free Courses</a>
                                </Link>
                        </li>
                        <li className={styles.menuItem}>
                                <Link href="/PaidCourses">
                                    <a>Paid Courses</a>
                                </Link>
                        </li>

                        {user&&(<button className={styles.btn}>
                            {user &&user.name}
                        </button>)}

                        {user &&(<button className={styles.btn}>
                        <Link href="/StudentDashboard">
                            <a>DashBoard</a>
                        </Link>
                        </button>)}
                       {user&&( <button className={styles.btn}>
                            <a onClick={logout}>Logout</a>
                        </button>)}
                    </ul>

                </div>
            </div>

        </div>
    )

}

export default TopNavbar;