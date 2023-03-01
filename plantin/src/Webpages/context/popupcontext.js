import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PopupContextcreate = createContext();
const PopupContext = ({
  children,
  isLogin,
  setIsLogin,
  isAdmin,
  setIsAdmin,
}) => {
  const [categorys, setCategorys] = useState([]);
  const navigate = useNavigate();
  const categoryfun = (item) => {
    if (item === "All Items") {
      navigate("/");
    } else {
      navigate(`/category/${item}`);
    }
  };

  return (
    <PopupContextcreate.Provider
      value={{
        isLogin,
        setIsLogin,
        isAdmin,
        setIsAdmin,
        categorys,
        setCategorys,
        categoryfun,
      }}
    >
      {children}
    </PopupContextcreate.Provider>
  );
};
export default PopupContext;
