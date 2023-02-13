import { React, useContext, useState, useEffect, useRef } from "react";
import "./MainRouter.css";
import { Link, useNavigate } from "react-router-dom";
import { AccountContextcreate } from "./context/Accountpopupcontext";
import Accountpopup from "./Accountpopup";
import { MdAccountCircle } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import PlantIn from "./Images/PlantInLogo.png";
export default function MainRouter() {
  const { menudrop } = useContext(AccountContextcreate);
  const [accountpopup, setAccountpopup] = useState(false);
  const navigate = useNavigate();
  let accountbtn = useRef(null);

  useEffect(() => {
    try {
      document.addEventListener("click", handleclickoutside, true);
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  const handleclickoutside = (e) => {
    try {
      if (!menudrop?.current?.contains(e.target)) {
        if (!accountbtn?.current.contains(e.target)) {
          setAccountpopup(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="MainContainer">
      <div>
        <div className="logo">
          <Link to="/">
            <img src={PlantIn} alt="" />
          </Link>
        </div>
      </div>

      <div className="buttoncontainer">
        <button
          className="uploadButton"
          onClick={() => {
            navigate("/upload");
          }}
        >
          <FiUpload size={20} />
          <div className="uploadtext">Upload</div>
        </button>
        <button
          className="Icon"
          ref={accountbtn}
          onClick={() => setAccountpopup(!accountpopup)}
        >
          <HiMenu size={25} className="iconsspace" />
          <MdAccountCircle size={35} />
        </button>
      </div>
      {accountpopup && <Accountpopup />}
    </div>
  );
}
