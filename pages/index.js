import React from 'react';

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { useRouter } from 'next/router'
import { useContext } from "react";
import { Context } from "../context/index";
import styles from './Home.module.css'

export default function Home() {




  //    //Context Api Things
  // const {state,dispatch}= useContext(Context);
  // // console.log("state is ", state);
  // const {user}=state;
  // console.log(user)













  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };









  const items = [

    <div className={styles.carasole}>
      {/* <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="alternate"
    /> */}

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

    </div>,

    <div className={styles.carasole}>
      {/* <AliceCarousel
    mouseTracking
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
/> */}

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

    </div>,

    <div className={styles.carasole}>
      {/* <AliceCarousel
    mouseTracking
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
/> */}

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

    </div>,

    <div className={styles.carasole}>
      {/* <AliceCarousel
   mouseTracking
   items={items}
   responsive={responsive}
   controlsStrategy="alternate"
/> */}

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

    </div>,

    <div className={styles.carasole}>
      {/* <AliceCarousel
    mouseTracking
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
/> */}

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

    </div>,
  ];
























  return (
    <>
      <div className={styles.mainheader}>
        <div className={styles.firstpartofheader}>

          <div className={styles.firstpartflex}>
            <p className={styles.easyeducation}>
              Distance Learning easy
            </p>
            <h1 className={styles.heading}>
              Learn New Skill Gain <br /> More  Education
            </h1>
            <p className={styles.bigpara}>
              Take high quality online courses from the best online Take high quality <br /> online courses from the best online instrictors around the world & <br /> develop your skills.
            </p>
            <div className={styles.twobuttons}>
              <button className={styles.btn}>
                Get Started
              </button>
              <button className={styles.btn2}>
                How it works
              </button>
            </div>
          </div>
        </div>
        <div className={styles.secondpartofheader}>
          <img className={styles.imgset} src="/headerpic.png" alt="" srcset="" />
        </div>
      </div>


      <div className={styles.secondmain}>
        <div className={styles.secondmainfirst}>

          <div className={styles.firsttwoimg}>
            <img className={styles.imgsetsize1} src="/first.png" alt="" srcset="" />
            <img className={styles.imgsetsize2} src="/second.png" alt="" srcset="" />
            <img className={styles.imgsetsize3} src="/third.png" alt="" srcset="" />
          </div>

        </div>
        <div className={styles.secondmainsecond}>
          <h2 className={styles.h2222}>
            Find Convenient & <br /> Affordable Learning
          </h2>
          <p className={styles.parafix}>
            Here we guide you to the best online courses, e-learning <br /> advice,
          </p>

          <div className={styles.numberandpara}>
            <span className={styles.span}>
              01
            </span>
            <p className={styles.paraadj}>
              Here we guide you to the best online courses, e-learning advice, and technology and resources for education and training.
            </p>
          </div>
          <div className={styles.numberandpara}>
            <span className={styles.span}>
              02
            </span>
            <p className={styles.paraadj}>
              Here we guide you to the best online courses, e-learning advice, and technology and resources for education and training.
            </p>
          </div>
          <div className={styles.numberandpara}>
            <span className={styles.span}>
              03
            </span>
            <p className={styles.paraadj}>
              Here we guide you to the best online courses, e-learning advice, and technology and resources for education and training.
            </p>
          </div>



        </div>
      </div>






      <div className={styles.third}>
        <h2 className={styles.thirdh2}>
          Our services
        </h2>
        <p className={styles.thirdpara}>
          Take high quality online courses from the best online instrictors <br />
          around the world & develop your skills.
        </p>
      </div>










      <div className={styles.fourth}>
        <div className={styles.fourthdiv}>
          <img className={styles.fourthimg} src="/dd.png" alt="" srcset="" />
          <p className={styles.fourthp}>Design</p>
          <a className={styles.fourtha}>View More</a>

        </div>
        <div className={styles.fourthdiv2}>
          <img className={styles.fourthimg} src="/dd.png" alt="" srcset="" />
          <p className={styles.fourthp}>Design</p>
          <a className={styles.fourtha}>View More</a>

        </div>
        <div className={styles.fourthdiv3}>
          <img className={styles.fourthimg} src="/dd.png" alt="" srcset="" />
          <p className={styles.fourthp}>Design</p>
          <a className={styles.fourtha}>View More</a>

        </div>
        <div className={styles.fourthdiv4}>
          <img className={styles.fourthimg} src="/dd.png" alt="" srcset="" />
          <p className={styles.fourthp}>Design</p>
          <a className={styles.fourtha}>View More</a>

        </div>
      </div>





      <div className={styles.widthcheck}>
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      </div>










      <div className={styles.fifth}>
        <div className={styles.fifthfirstdiv}>
          <h1 className={styles.fifthfirstdivh1}>
            Welcome to <br /> e-Learning Centre
          </h1>
          <p className={styles.fifthfirstdivpara}>
            Here we guide you to the best online courses, e-learning advice, and technology and resources for education and training.
          </p>
          <div className={styles.fifthfirstdivlowerdiv} >
            <div className={styles.fifthfirstdivlowerdivimg}>
              <img src="/safe.png" alt="" srcset="" />
            </div>
            <div className={styles.fifthfirstdivlowersafe}>
              <p className={styles.fifthfirstdivlowersafespan}>
                Safe & Secured
              </p>
              <p className={styles.fifthfirstdivlowersafepara}>
                Safe and Secured our services and every step of process.
              </p>
            </div>
          </div>

          <div className={styles.fifthfirstdivlowerdiv} >
            <div className={styles.fifthfirstdivlowerdivimg}>
              <img src="/expert.png" alt="" srcset="" />
            </div>
            <div className={styles.fifthfirstdivlowersafe}>
              <p className={styles.fifthfirstdivlowersafespan}>
                Highly Expert Instructors
              </p>
              <p className={styles.fifthfirstdivlowersafepara}>
                There are coffee shops, sports, restaurants and a multitude of great study..
              </p>
            </div>
          </div>

        </div>
        <div className={styles.fifthseconddiv}>

          <div className={styles.studentimg}>
            <img src="/students.png" alt="" srcset="" />
          </div>

        </div>
      </div>











      <div className={styles.bb}>
        <h2 className={styles.bbh2} >
          Newsletter
        </h2>
        <p className={styles.bbpara}>
          Take high quality online courses from the best .
        </p>
        <div className={styles.cirleinput}>
          <input type="text" className={styles.cssinput} />
          <a className={styles.btnn} ><img src="/go.png" alt="" srcset="" /></a>
        </div>
      </div>






      {/* <div className={styles.footer}>
        <div className={styles.footerfirst}>
          <img src="/gfgLogo.png" alt="" srcset="" />
        </div>
        <div className={styles.footersecond}>
          <a href="">Teachers</a>
          <a href="">Courses</a>
          <a href="">Free Course</a>
          <a href="">Paid Courses</a>
        </div>

        <div className={styles.footerfirstthird}>
          <p>
          Stay up to date
          </p>
          <span>
          Stay Informed On How You Can Make a Difference
          </span>
        </div>

      </div>



      <div className={styles.lastone}>

        <div className={styles.lastoneone}>
        <p className={styles.lastonepara}>Copyright©uihut 2021. All rights reserved</p>
        </div>
        <div className={styles.lastoneonesecond}>
          <span className={styles.contact}>
          CONTACT
          </span>
          <a href = "mailto: muhammadahmadrcs@gmail.com">Send Email</a>
        </div>
      
      </div> */}









      





    </>








  )
}
