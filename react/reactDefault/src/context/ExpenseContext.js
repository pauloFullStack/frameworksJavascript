import { createContext, useState, useContext } from 'react';
import axios from 'axios';

const ExpenseContext = createContext();

export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};

export const ExepnseProvider = ({ children }) => {

  const [data, setData] = useState({});
  const handleTextChange = (e) => {
    const data = {};
    data[e.target.id] = e.target.value;
    console.log(data);
    setData(data);
  };


  return (
    <ExpenseContext.Provider
      value={{
        handleTextChange,
        setData
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
