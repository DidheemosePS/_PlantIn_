import { createContext, useEffect, useState } from "react";

export const CategoryContextcreate = createContext();
const CategoryContext = ({ children }) => {
  const [results, setResults] = useState([]);
  const [data, setData] = useState(results);

  const categoryfun = (item) => {
    if (item === "All Items") {
      setData(results);
    } else {
      const result = results.filter(
        (categoryitem) => categoryitem.category === item
      );
      setData(result);
    }
  };

  useEffect(() => {
    setData(results);
  }, [results]);

  return (
    <CategoryContextcreate.Provider
      value={{
        categoryfun,
        data,
        setData,
        results,
        setResults,
      }}
    >
      {children}
    </CategoryContextcreate.Provider>
  );
};
export default CategoryContext;
