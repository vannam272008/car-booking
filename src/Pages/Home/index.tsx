import { useEffect } from "react";
import request from "../../Utils/request";




const Home = () => {
  useEffect(() => {
    const res = request.get("/request/get-all?page=1&limit=10");
    console.log(res);
  }, [])
  return <>Home</>
}

export default Home;
