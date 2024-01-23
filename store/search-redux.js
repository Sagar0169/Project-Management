import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
});

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

export async function getAddress(lat,lon){
  const url='https://geocode.maps.co/reverse?lat='+lat+'&lon='+lon
  const response= await fetch(url)
  if(!response.ok){
      throw new Error('Failed to fetch Address');
  }
  const data= await response.json()
  console.log(data.display_name)
  
  return (data.display_name)
}  
