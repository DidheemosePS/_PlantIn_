import { createContext, useState } from "react";

export const PopupContextcreate = createContext();
const PopupContext = ({
  children,
  isLogin,
  setIsLogin,
  isAdmin,
  setIsAdmin,
}) => {
  const [popupvalue, setPopupvalue] = useState(false);
  const [categorys, setCategorys] = useState([]);

  return (
    <PopupContextcreate.Provider
      value={{
        popupvalue,
        setPopupvalue,
        isLogin,
        setIsLogin,
        isAdmin,
        setIsAdmin,
        categorys,
        setCategorys,
      }}
    >
      {children}
    </PopupContextcreate.Provider>
  );
};
export default PopupContext;
