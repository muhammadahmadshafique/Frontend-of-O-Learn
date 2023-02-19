import { useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";

import { useRouter } from "next/router";
import axios from "axios";

const StripeSuccess = () => {
  // router
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) successRequest();
  }, [id]);

  console.log(id);

  const successRequest = async () => {
    const { data } = await axios.get(`/api/stripe-success/${id}`);
    // console.log("SUCCESS REQ DATA", data);
    router.push(`/course/${data.course.slug}`);
  };

  return (
   
      
          <div className="d-flex justify-content-center p-5">
            <SyncOutlined spin className="display-1 text-danger p-5" />
          </div>
       
      
    
  );
};

export default StripeSuccess;
