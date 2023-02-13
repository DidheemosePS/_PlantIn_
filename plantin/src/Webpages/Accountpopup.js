import { Link, useNavigate } from "react-router-dom";
import "./Accountpopupcss.css";
import { BiChevronRight } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { AccountContextcreate } from "./context/Accountpopupcontext";
import { useContext } from "react";
import { PopupContextcreate } from "./context/popupcontext";

export default function Accountpopup() {
  const { menudrop } = useContext(AccountContextcreate);
  const { isLogin, setIsLogin, isAdmin, setIsAdmin } =
    useContext(PopupContextcreate);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");

  return (
    <div className="accountpopupmain" ref={menudrop}>
      <div className="useraccount">
        <MdAccountCircle size={25} className="useraccounticon" />
        {username ? <>{username}</> : <>Username</>}
      </div>
      <div className="navpages">
        {isAdmin ? (
          <Link to="/AdminPage" className="navpageslink">
            Admin Page
            <BiChevronRight className="arrowicon" />
          </Link>
        ) : null}
        <Link to="/profile" className="navpageslink">
          Profile
          <BiChevronRight className="arrowicon" />
        </Link>
        <Link to="/about" className="navpageslink">
          About
          <BiChevronRight className="arrowicon" />
        </Link>
        <Link to="/contact" className="navpageslink">
          Contact
          <BiChevronRight className="arrowicon" />
        </Link>
        {isLogin || isAdmin ? (
          <Link
            to="/"
            onClick={() => {
              sessionStorage.clear();
              setIsLogin(false);
              setIsAdmin(false);
              navigate("/");
            }}
            className="navpageslink"
          >
            Logout <BiChevronRight className="arrowicon" />
          </Link>
        ) : (
          <Link to="/login" className="navpageslink">
            Login <BiChevronRight className="arrowicon" />
          </Link>
        )}
      </div>
    </div>
  );
}
