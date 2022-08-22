import React, { useContext, useEffect, useRef, useState } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [solution, setSolution] = useState("abcde");

  const [guessNo, setguessNo] = useState(0);
  const [guesses, setGuesses] = useState(
    solution.split("").map((letter, i) => {
      return {
        id: i,
        text: new Array(solution.length).fill(""),
        checked: false,
      };
    })
  );
  const [typedNo, setTypedNo] = useState(0);

  useEffect(() => {
    // const initGuesses = solution.split("").map((letter, i) => {
    //   return { id: i, text: new Array(solution.length).fill("") };
    // });
    // setGuesses(initGuesses);
    function write(e) {
      if (
        String(e.key).length === 1 &&
        String(e.key).match(/[a-z]/i) &&
        typedNo <= solution.length - 1
      ) {
        setGuesses((guesses) => {
          let temp = [...guesses];

          temp[guessNo].text[typedNo] = e.key;
          return temp;
        });

        setTypedNo((typedNo) => typedNo + 1);
      }
      if (e.key === "Enter") {
        if (guesses[guessNo].text.join("").length !== solution.length) {
          alert("Please fill all the boxes");
        } else {
          let temp = [...guesses];
          temp[guessNo].checked = true;
          setGuesses(temp);
        }
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
