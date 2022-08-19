import { useGlobalContext } from "./context";
import { SingleLetter } from "./SingleLetter";
export const SingleWord = ({ guess }) => {
  const context = useGlobalContext();
  return (
    <div className="word">
      {guess.text.map((item, i) => (
        <SingleLetter key={i} letter={item} />
      ))}
    </div>
  );
};
