import React from "react";
import { Link } from "react-router-dom";
import "./404Page.css";
export default function Page() {
  return (
    <div className="errorpagecontainer">
      <p className="p1">404</p>
      <p className="p2">Page not found</p>
      <br />
      <p className="p3">
        Oops! The page you are looking for does not exist. It might have been
        moved or delete
      </p>
      <br />
      <Link to={"/"} className="bthlink">
        BACK TO HOME
      </Link>
    </div>
  );
}
