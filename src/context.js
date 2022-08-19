import React, { useContext, useEffect, useRef, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [solution, setSolution] = useState("abcde");

  const [guessNo, setguessNo] = useState(0);
  const [guesses, setGuesses] = useState(
    solution.split("").map((letter, i) => {
      return { id: i, text: new Array(solution.length).fill("") };
    })
  );
  const [typedNo, setTypedNo] = useState(0);

  useEffect(() => {
    // const initGuesses = solution.split("").map((letter, i) => {
    //   return { id: i, text: new Array(solution.length).fill("") };
    // });
    // setGuesses(initGuesses);
    function write(e) {
      console.log(typedNo);
      if (String(e.key).match(/[a-z]/i) && typedNo <= solution.length - 1) {
        setGuesses((guesses) => {
          let temp = [...guesses];
          console.log(temp);
          temp[guessNo].text[typedNo] = e.key;
          return temp;
        });

        setTypedNo((typedNo) => typedNo + 1);
      }
    }

    window.addEventListener("keypress", write);
    return () => {
      window.removeEventListener("keypress", write);
    };
  }, [typedNo, guessNo]);
  return (
    <AppContext.Provider
      value={{ solution: solution.split(""), guesses: guesses }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
