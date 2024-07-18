"use client";
import React, { createContext, useState } from "react";

export const MyContext = createContext();

export const Myprovider = ({ children }) => {
  const [state, setState] = useState([]);
  const [counts, setCounts] = useState([]);
  const insertOrUpdateKeyValuePair = (key, value, count) => {
    setState((prevState) => {
      const existingPairIndex = prevState.findIndex((pair) => pair.key === key);
      if (existingPairIndex !== -1) {
        // Update the existing key-value pair
        const updatedState = [...prevState];
        updatedState[existingPairIndex].value += value / 2;
        return updatedState;
      } else {
        // Insert the new key-value pair
        return [...prevState, { key, value }];
      }
    });

    setCounts((prevState) => {
      const existingPairIndex = prevState.findIndex((pair) => pair.key === key);
      if (existingPairIndex !== -1) {
        // Update the existing key-value pair
        const updatedState = [...prevState];
        updatedState[existingPairIndex].count += count / 2;
        return updatedState;
      } else {
        // Insert the new key-value pair
        return [...prevState, { key, count }];
      }
    });
  };

  const removeKeyValuePair = (key) => {
    setState((prevState) => prevState.filter((pair) => pair.key !== key));
    setCounts((prevState) => prevState.filter((pair) => pair.key !== key));
  };
  return (
    <MyContext.Provider
      value={{
        state,
        insertOrUpdateKeyValuePair,
        removeKeyValuePair,
        counts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
