import { useGlobalContext } from "./context";
import { SingleWord } from "./SingleWord";
function App() {
  const context = useGlobalContext();
  return (
    <main>
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
