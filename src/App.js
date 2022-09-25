import { useGlobalContext } from "./context";
import { SingleWord } from "./SingleWord";
function App() {
  const context = useGlobalContext();
  return (
    <main>
      <section className="used-section">
        <div className="forbidden-letters">
          <h3>DISQUALIFIED LETTERS</h3>
          <div className="letter-container">
            {Array.from(context.trash).map((letter, i) => {
              return (
                <div className="forbidden-letter" key={i}>
                  {letter}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="board-section">
        <header>
          <h1 className="title">DYNAMIC WORDLE</h1>
          <h4 className={`error-msg ${context.error ? "show-error" : null}`}>
            {context.errorMsg}
          </h4>
        </header>
        <section className="words">
          {context.guesses.map((item) => (
            <SingleWord key={item.id} guess={item} />
          ))}
        </section>
      </section>
    </main>
  );
}

export default App;
