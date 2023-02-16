// import React, { useEffect, useState } from "react";
// import "./LoggedUsers.css";
// import axios from "axios";
// export default function LoggedUsers() {
//   const [loggedUsers, setLoggedUser] = useState([]);
//   useEffect(() => {
//     axios.get("https://localhost:3004/logged/users").then((response) => {
//       setLoggedUser(response.data);
//     });
//   });
//   return (
//     <div>
//       {loggedUsers.map((user) => {
//         <>
//           <p>user.name</p>
//           <p>user.email</p>
//         </>;
//       })}
//     </div>
//   );
// }
