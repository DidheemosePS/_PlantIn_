import { useContext, useEffect } from "react";
import "./Post.css";
import { CategoryContextcreate } from "./context/categoryContext";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const { data, setResults } = useContext(CategoryContextcreate);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios.get("https://plantin.onrender.com/").then((response) => {
        setResults(response.data);
      });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="postmaincontainer">
      {data.map((data) => (
        <div onClick={() => navigate(`/post/${data._id}`)} key={data._id}>
          <div className="cardscontainer">
            <div className="cardimage">
              <img
                className="image"
                src={data.imageurl}
                alt="Something went wrong"
              ></img>
            </div>
            <div className="cardcontent">
              <div className="cardtitle">{data.title}</div>
              <div className="carddescription">{data.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
