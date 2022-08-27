import React, { useContext, useEffect, useRef, useState } from "react";
const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [solution, setSolution] = useState("cankut");
  const [guessNo, setGuessNo] = useState(0);
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
  const [trash, setTrash] = useState(new Set());

  useEffect(() => {
    function write(e) {
      if (
        String(e.key).length === 1 &&
        String(e.key).match(/[a-z]/i) &&
        typedNo <= solution.length - 1
      ) {
        if (!trash.has(e.key)) {
          setGuesses((guesses) => {
            let temp = [...guesses];

            temp[guessNo].text[typedNo] = e.key;
            return temp;
          });

          setTypedNo((typedNo) => typedNo + 1);
        }
      }
      if (e.key === "Enter") {
        if (guesses[guessNo].text.join("").length !== solution.length) {
          alert("Please fill all the boxes");
        } else {
          let temp = [...guesses];
          temp[guessNo].checked = true;
          setGuesses(temp);
          setGuessNo(guessNo + 1);
          setTypedNo(0);
        }
        guesses[guessNo].text.forEach((letter, i) => {
          if (!solution.includes(letter)) {
            setTrash((trash) => {
              trash.add(letter);
              return trash;
            });
          }
        });
      }

      if (e.key === "Backspace") {
        if (typedNo > 0) {
          setGuesses((guesses) => {
            console.log(typedNo);
            let temp = [...guesses];

            temp[guessNo].text[typedNo - 1] = "";
            return temp;
          });
          setTypedNo((prev) => prev - 1);
        }
      }
    }

    window.addEventListener("keyup", write);
    return () => {
      window.removeEventListener("keyup", write);
    };
  }, [typedNo, guessNo]);
  return (
    <AppContext.Provider
      value={{ solution: solution.split(""), guesses: guesses, trash: trash }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
