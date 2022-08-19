import { useGlobalContext } from "./context";

export const SingleLetter = ({ letter }) => {
  const context = useGlobalContext();

  return <div className="letter">{letter}</div>;
};
