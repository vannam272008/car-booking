import { useEffect, useState } from "react";
import request from "../../Utils/request";



// Exemple Get data using request (axios)
const Home = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    const endpoint = "/request/get-all?page=" + page + "&limit=" + limit;
    const response = request.get(endpoint).then((res) => {
      console.log(res.data);
    }
    );

  }, [page, limit])
  return <>Home</>
}

export default Home;
