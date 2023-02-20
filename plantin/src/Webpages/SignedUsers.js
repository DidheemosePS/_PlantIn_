import React, { useEffect, useState } from "react";
import "./SignedUsers.css";
import axios from "axios";

export default function SignedUsers() {
  const [signedUsers, setSignedUsers] = useState([]);

  const deleteusers = async (id) => {
    try {
      const deleteuser = await axios.post(
        "http://15.206.169.100:3004/signed/user/delete",
        {
          id,
        }
      );
      setSignedUsers(deleteuser.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    try {
      axios.get("http://15.206.169.100:3004/signed/users").then((response) => {
        setSignedUsers(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="signeduserslist">
      <table border={1} className="signedusers">
        <thead>
          <tr className="usersdetail">
            <th>Username</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        </thead>
        {signedUsers.map((users) => (
          <thead key={users._id}>
            <tr>
              <td className="usersdetail">{users.name}</td>
              <td className="usersdetail">{users.email}</td>
              <td className="usersdeletebtn">
                <input
                  type="button"
                  value="Delete"
                  className="deletebtn"
                  onClick={() => deleteusers(users._id)}
                />
              </td>
            </tr>
          </thead>
        ))}
      </table>
    </div>
  );
}
