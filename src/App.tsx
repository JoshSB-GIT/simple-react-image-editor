import { ImageEditor } from "./index";

import "./App.css";

function App() {
  return (
    <main className="app">
      <div className="app__container">
        <header className="app__header">
          <h1>React Image Editor</h1>

          <p>Playground de desarrollo de la librería.</p>
        </header>

        <ImageEditor />
      </div>
    </main>
  );
}

export default App;
