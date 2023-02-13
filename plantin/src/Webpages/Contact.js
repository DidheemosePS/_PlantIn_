import "./Contact.css";
import { BiSend } from "react-icons/bi";
import { IoIosMail } from "react-icons/io";
import { BsTelephoneFill } from "react-icons/bs";
import { TfiLinkedin, TfiTwitterAlt } from "react-icons/tfi";
import { AiFillInstagram } from "react-icons/ai";

export default function Contact() {
  return (
    <div className="contactmain">
      <div className="leftcontact">
        <h1>Contact Us</h1>
        <p>Ask us anythink or just say hi...</p>
        <BsTelephoneFill className="phoneicon" size={20} />
        <p>7770627300</p>
        <IoIosMail className="mailicon" size={25} />
        <p>plantin.contact@gamil.com</p>
        <div className="followus">
          <h2>Follow Us</h2>
          <div className="icons">
            <AiFillInstagram
              size={25}
              className="icon"
              onClick={() =>
                window.open("https://www.instagram.com/", "_blank")
              }
            />
            <TfiLinkedin
              size={23}
              className="icon"
              onClick={() => window.open("https://www.linkedin.com/", "_blank")}
            />
            <TfiTwitterAlt
              size={25}
              className="icon"
              onClick={() => window.open("https://www.twitter.com/", "_blank")}
            />
          </div>
        </div>
      </div>
      <div className="rightcontact">
        <input type="text" placeholder="Enter your Name" />
        <input type="text" placeholder="Enter a valid email address" />
        <textarea placeholder="Enter your message" />
        <button>
          Send
          <BiSend className="sentbtn" />
        </button>
      </div>
    </div>
  );
}
