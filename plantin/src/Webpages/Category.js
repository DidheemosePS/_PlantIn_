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
  const userid = jwt_decode(sessionStorage.getItem("ghasjdsbdnewiqyew"));

  const deletecategory = async (categoryid) => {
    const response = await axios.post("https://plantin.onrender.com/category/delete", {
      categoryid,
    });
    setCategorys(response.data);
  };

  useEffect(() => {
    axios.get("https://plantin.onrender.com/category/fetch").then((response) => {
      setCategorys(response.data);
    });
    // eslint-disable-next-line
  }, []);
  return (
    <div className="maincategory">
      <div className="category">
        {categorys && (
          <button
            className="categorybutton"
            onClick={() => categoryfun("All Items")}
          >
            All Items
          </button>
        )}
        {categorys.map((data) => (
          <div className="categorymap" key={data._id}>
            <button
              className="categorybutton"
              onClick={() => categoryfun(data.category)}
            >
              {data.category}
            </button>
            {userid.role === "user" && (
              <button
                className="categorydeletebtn"
                onClick={() => deletecategory(data._id)}
              >
                <MdDeleteOutline size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
