import { createContext, useRef } from "react";

export const AccountContextcreate = createContext();
const AccountContext = ({ children }) => {
  const menudrop = useRef(null);
  return (
    <AccountContextcreate.Provider value={{ menudrop }}>
      {children}
    </AccountContextcreate.Provider>
  );
};
export default AccountContext;
