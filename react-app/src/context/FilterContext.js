import { createContext, useContext, useState } from 'react';

export const FilterContext = createContext(); // context that will be used to pass the filter state to the components

export const useFilter = () => useContext( filterContext ); // this is the hook that will be used to access the filter state

export default function FilterProvider({ children }) {
  const [filterQuery, setFilterQuery] = useState();

  return (
    <FilterContext.Provider
      value={{ filterQuery, setFilterQuery }}
    >
      {children}
    </FilterContext.Provider>
  );
};
