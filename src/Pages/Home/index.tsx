import { useEffect } from "react";
import { useNavigate } from "react-router";



// Exemple Get data using request (axios)
const Home = () => {
  const userID = localStorage.getItem("Id");
  const navigate = useNavigate();

  useEffect(() => {
    if (userID === null || userID === undefined) {
      navigate('/login');
    }
  }, [userID, navigate])

  return <>Home</>
}

export default Home;
