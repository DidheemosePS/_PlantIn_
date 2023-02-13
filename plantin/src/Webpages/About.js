import React from "react";
import "./About.css";
import { MdWavingHand, MdGroups } from "react-icons/md";
import { FaSafari, FaTools, FaHeartbeat } from "react-icons/fa";
import { SiReactos } from "react-icons/si";
import { FcIdea, FcAnswers } from "react-icons/fc";

export default function About() {
  return (
    <div className="aboutmain">
      <div className="aboutcontent">
        <h4>Who we are</h4>
        <br />
        <h2>
          Empowering the world to develop technology through sharing knowledge.
        </h2>
        <br />
        <FcIdea size={35} />
        <p>
          This is a platform where people can share their thoughts about the
          idea they have.
        </p>
        <br />
        <MdGroups size={35} style={{ color: "green" }} />
        <p>We aim to bring people together and share their thoughts.</p>
        <br />
        <FcAnswers size={35} />
        <p>
          PlantIn helps people find the answers they need when they need them.
          We want people to come and visit our webpage to share, learn and gain
          technical knowledge.
        </p>
        <br />
        <FaTools size={30} style={{ color: "grey" }} />
        <p>
          Our products and tools empower people to find what they need to
          develop technology at work or home.
        </p>
      </div>
      <div className="aboutcontent">
        <h4>Our core values</h4>
        <br />
        <FaHeartbeat size={35} style={{ color: "#F55050" }} />
        <h3>Adopt a customer-first mindset</h3>
        <p>
          Authentically serve our customers by empowering, listening, and
          collaborating among others.
        </p>
        <br />
        <MdWavingHand size={35} style={{ color: "#D3756B" }} />
        <h3>Be flexible and inclusive</h3>
        <p>
          We do our best work when a diverse group of people collaborate in an
          environment of respect and trust.
        </p>
        <br />
        <FaSafari size={35} style={{ color: "#B7B78A" }} />
        <h3>Be transparent</h3>
        <p>
          Communicate openly and honestly, both inside and outside the company.
        </p>
        <br />
        <SiReactos size={35} style={{ color: "#f48225" }} />
        <h3>Empower people to deliver outstanding results</h3>
        <p>
          Give people space to get their job done, support them when they need
          it.
        </p>
      </div>
      <div className="aboutcontent">
        <h4>Where we from</h4>
        <br />
        <MdGroups size={35} style={{ color: "green" }} />
        <p>
          We're a group of students from the naipunnya institute of management
          and technology.
        </p>
      </div>
    </div>
  );
}
