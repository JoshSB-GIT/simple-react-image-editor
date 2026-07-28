import { useState } from "react";

import { ImageEditor } from "./index";

import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
  };

  return (
    <main className="app">
      <div className="app__container">
        <header className="app__header">
          <div>
            <h1>React Image Editor</h1>
            <p>Playground de desarrollo de la librería.</p>
          </div>

          <label className="app__file-control">
            <span>Seleccionar imagen</span>

            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </header>

        <ImageEditor source={selectedFile} />
      </div>
    </main>
  );
}

export default App;
