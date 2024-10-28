import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);
  const [srcDoc, setSrcDoc] = useState('');

  async function enablePIP() {
    const player = document.querySelector("#cf-result");
    const pipWindow = await documentPictureInPicture.requestWindow();
    pipWindow.document.body.append(player);

    pipWindow.addEventListener("pagehide", (event) => {
      const playerContainer = document.querySelector("#cf-result-container");
      const pipPlayer = event.target.querySelector("#cf-result");
      playerContainer.append(pipPlayer);
    });
  }

  function ShowPIP() {
    if ('documentPictureInPicture' in window) {
      return <button onClick={enablePIP}>
        <span class="material-symbols-outlined">
        picture_in_picture_alt
        </span>
      </button>
    }
  }

  

  useEffect(() => {
    const defaultSettings = {
      value: '',
      theme: 'vs-dark',
      automaticLayout: true
    }
    const htmlEditor = monaco.editor.create(htmlEditorRef.current, {
      ...defaultSettings,
      ...{language: 'html'}
    });

    const cssEditor = monaco.editor.create(cssEditorRef.current, {
      ...defaultSettings,
      ...{language: 'css'}
    });

    const jsEditor = monaco.editor.create(jsEditorRef.current, {
      ...defaultSettings,
      ...{language: 'javascript'}
    });

    const updatePreview = () => {
      const html = htmlEditor.getValue();
      const css = `<style>${cssEditor.getValue()}</style>`;
      const js = `<script>${jsEditor.getValue()}<\/script>`;
      setSrcDoc(`<html><head>${css}</head><body>${html}</body>${js}</html>`);
    };

    htmlEditor.onDidChangeModelContent(updatePreview);
    cssEditor.onDidChangeModelContent(updatePreview);
    jsEditor.onDidChangeModelContent(updatePreview);

    return () => {
      htmlEditor.dispose();
      cssEditor.dispose();
      jsEditor.dispose();
    };
  }, []);

  return (
    <div className="App">

      <header className='cf-header'>
        <div className="cf-logo">
          <h1>Code Fiddle</h1>
        </div>
      </header>

      <div className="cf-editor-container">
        <div className="cf-editor-container-section">
          <div className="cf-editor">
            <div className="cf-editor-header">
              <h2>HTML</h2>
            </div>
            <div className="cf-editor-monaco" ref={htmlEditorRef}>

            </div>
          </div>
          <div className="cf-editor">
            <div className="cf-editor-header">
              <h2>CSS</h2>
            </div>
            <div className="cf-editor-monaco" ref={cssEditorRef}>

            </div>
          </div>
        </div>

        <div className="cf-editor-container-section">
          <div className="cf-editor">
            <div className="cf-editor-header">
              <h2>Javascript</h2>
            </div>
            <div className="cf-editor-monaco" ref={jsEditorRef}>

            </div>
          </div>
          <div className="cf-editor">
            <div className="cf-editor-header">
              <h2>Result</h2>
              <div className="cf-options">

                <ShowPIP />
              </div>
            </div>
            <div className="cf-editor-monaco" id="cf-result-container">
              <iframe
                srcDoc={srcDoc}
                id="cf-result"
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%"
                style={{border:0}}>
              </iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
