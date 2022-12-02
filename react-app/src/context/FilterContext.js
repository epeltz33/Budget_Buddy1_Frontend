import { createContext, useContext, useState } from "react";

export const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export default function FilterProvider({ children }) {
  const [filterQuery, setFilterQuery] = useState();

  return (
    <FilterContext.Provider value={{ filterQuery, setFilterQuery }}>
      {children}
    </FilterContext.Provider>
  );
}
