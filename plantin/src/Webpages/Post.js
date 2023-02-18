import { useContext, useEffect } from "react";
import "./Post.css";
import { CategoryContextcreate } from "./context/categoryContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";

export default function Post() {
  const { data, setResults } = useContext(CategoryContextcreate);
  const navigate = useNavigate();

  const shuffle = (arrayData) => {
    const shuffledArray = [];
    const usedIndexes = [];
    let i = 0;
    while (i < arrayData.length) {
      const randomNumber = Math.floor(Math.random() * arrayData.length);
      if (!usedIndexes.includes(randomNumber)) {
        shuffledArray.push(arrayData[randomNumber]);
        usedIndexes.push(randomNumber);
        i++;
      }
    }
    setResults(shuffledArray);
  };

  useEffect(() => {
    try {
      axios.get("http://localhost:3004/").then((response) => {
        shuffle(response.data);
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
            <div className="username">
              <BsPersonCircle size={25} className="icons" />
              <p>{data.uploader}</p>
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
