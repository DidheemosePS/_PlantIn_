import { useContext, useEffect, useRef } from "react";
import "./Category.css";
import { CategoryContextcreate } from "./context/categoryContext";
import axios from "axios";
import { PopupContextcreate } from "./context/popupcontext";

export default function Category() {
  const { categoryfun } = useContext(CategoryContextcreate);
  const test = useRef();
  const { categorys, setCategorys } = useContext(PopupContextcreate);

  useEffect(() => {
    axios.get("http://localhost:3004/category/fetch").then((response) => {
      setCategorys(response.data);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="maincategory">
      <div className="category" ref={test}>
        {categorys.map((data) => (
          <button
            className="categorybutton"
            key={data._id}
            onClick={() => categoryfun(data.category)}
          >
            {data.category}
          </button>
        ))}
      </div>
    </div>
  );
}
