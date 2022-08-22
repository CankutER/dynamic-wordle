import { useGlobalContext } from "./context";

export const SingleLetter = ({ letter, checked, no }) => {
  const context = useGlobalContext();

  return (
    <div
      className={`letter ${
        checked
          ? letter === context.solution[no]
            ? "true"
            : context.solution.includes(letter)
            ? "exists"
            : "false"
          : null
      }`}
    >
      {letter}
    </div>
  );
};
