import { useContext, useEffect } from "react";
import "./Category.css";
import { CategoryContextcreate } from "./context/categoryContext";
import axios from "axios";
import { PopupContextcreate } from "./context/popupcontext";
import { MdDeleteOutline } from "react-icons/md";
import jwt_decode from "jwt-decode";
export default function Category() {
  const { categoryfun } = useContext(CategoryContextcreate);
  const { categorys, setCategorys } = useContext(PopupContextcreate);
  const token = sessionStorage.getItem("ghasjdsbdnewiqyew");
  const deletecategory = async (categoryid) => {
    try {
      const response = await axios.post(
        "https://plantin.onrender.com/category/delete",
        {
          categoryid,
        }
      );
      setCategorys(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    axios
      .get("https://plantin.onrender.com/category/fetch")
      .then((response) => {
        setCategorys(response.data);
      });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="maincategory">
      <div className="category">
        {categorys.slice(0, 1).map((data) => (
          <button
            className="categorybutton"
            key={data._id}
            onClick={() => categoryfun(data.category)}
          >
            {data.category}
          </button>
        ))}
        {categorys.slice(1).map((data) => (
          <div className="categorymap" key={data._id}>
            <button
              className="categorybutton"
              onClick={() => categoryfun(data.category)}
            >
              {data.category}
            </button>
            {token && jwt_decode(token).role === "admin" && (
              <button
                className="categorydeletebtn"
                onClick={() => deletecategory(data._id)}
              >
                <MdDeleteOutline size={20} className="icons" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
