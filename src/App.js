import { useGlobalContext } from "./context";
import { SingleWord } from "./SingleWord";
function App() {
  const context = useGlobalContext();
  return (
    <main>
      <div className="forbidden-letters">
        <h3>Letters that are not in the secret word</h3>
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
      <header>
        <h1 className="title">Wordle on React</h1>
      </header>
      <section className="words">
        {context.guesses.map((item) => (
          <SingleWord key={item.id} guess={item} />
        ))}
      </section>
    </main>
  );
}

export default App;
