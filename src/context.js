import React, { useContext, useEffect, useRef, useState } from "react";
const AppContext = React.createContext();
const baseUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
export const AppProvider = ({ children }) => {
  const [solution, setSolution] = useState("surprise");
  const [guessNo, setGuessNo] = useState(0);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
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

  const checkWord = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        return "Please use a valid English word";
      }
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    async function write(e) {
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
        window.removeEventListener("keyup", write);
        if (
          guesses[guessNo].text.join("").length !== solution.length &&
          error !== "GRATZZZ!!! YOU HAVE WON!!!"
        ) {
          setIsError(true);
          setError("please fill all the boxes");
        } else {
          const toBeChecked = guesses[guessNo].text.join("");
          const checkData = await checkWord(baseUrl + toBeChecked);

          if (checkData[0].word) {
            // console.log(guesses[guessNo].text.join("").toLowerCase);
            let temp = [...guesses];
            temp[guessNo].checked = true;
            setGuesses(temp);
            setGuessNo(guessNo + 1);
            setTypedNo(0);
            if (guesses[guessNo].text.join("").toLowerCase() === solution) {
              console.log("hey");
              setIsError(true);
              setError("GRATZZZ!!! YOU HAVE WON!!!");
              setTypedNo(Infinity);
            }
            guesses[guessNo].text.forEach((letter, i) => {
              if (!solution.includes(letter)) {
                setTrash((trash) => {
                  trash.add(letter);
                  return trash;
                });
              }
            });
          } else {
            setIsError(true);
            setError("please try a valid word");
          }
        }
        window.addEventListener("keyup", write);
      }

      if (e.key === "Backspace") {
        if (typedNo > 0) {
          setGuesses((guesses) => {
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
  useEffect(() => {
    if (isError && error !== "GRATZZZ!!! YOU HAVE WON!!!") {
      const timer = setTimeout(() => {
        setIsError(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isError]);
  return (
    <AppContext.Provider
      value={{
        solution: solution.split(""),
        guesses: guesses,
        trash: trash,
        error: isError,
        errorMsg: error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
