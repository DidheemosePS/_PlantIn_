import React from "react";
import "./AlertBoxs.css";
import { AiOutlineWarning } from "react-icons/ai";

export function DeleteAlertBoxs({
  setIsDelete,
  postid,
  setPostid,
  deletefunction,
}) {
  return (
    <div className="deletealertmain">
      <div className="icons">
        <AiOutlineWarning size={35} className="icon" />
        <p className="title">Delete Post</p>
        <p>You are going to delete a post</p>
      </div>
      <div className="buttons">
        <button
          className="nobtn"
          onClick={() => {
            setPostid("");
            setIsDelete(false);
          }}
        >
          No, Keep it
        </button>
        <button
          className="yesbtn"
          onClick={() => {
            deletefunction(postid);
            setIsDelete(false);
          }}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
}

export function AdminDeleteAlertBoxs({
  setIsDelete,
  postid,
  setPostid,
  deletefunction,
}) {
  return (
    <div className="deletealertmain">
      <div className="icons">
        <AiOutlineWarning size={35} className="icon" />
        <p className="title">Delete Post</p>
        <p>You are going to delete a post</p>
      </div>
      <div className="buttons">
        <button
          className="nobtn"
          onClick={() => {
            setPostid("");
            setIsDelete(false);
          }}
        >
          No, Keep it
        </button>
        <button
          className="yesbtn"
          onClick={() => {
            deletefunction(postid);
            setIsDelete(false);
          }}
        >
          Yes, Delete
        </button>
      </div>
    </div>
  );
}
