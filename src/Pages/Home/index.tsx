import { useEffect } from "react";
import { useNavigate } from "react-router";



// Exemple Get data using request (axios)
const Home = () => {
  const userID = localStorage.getItem("Id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID == null || userID) {
      navigate('/login');
    }
  }, [userID, navigate])

  // const [page, setPage] = useState(1);
  // const [limit, setLimit] = useState(10);
  // useEffect(() => {
  //   const endpoint = "/request/get-all?page=" + page + "&limit=" + limit;
  //   const response = request.get(endpoint).then((res) => {
  //     console.log(res.data);
  //   }
  //   );

  // }, [page, limit])
  return <>Home</>
}

export default Home;
