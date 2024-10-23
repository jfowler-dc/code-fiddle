import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);
  const [srcDoc, setSrcDoc] = useState('');

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
        <h1>Code Fiddle</h1>
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
            </div>
            <div className="cf-editor-monaco">
              <iframe
                srcDoc={srcDoc}
                title="output"
                sandbox="allow-scripts"
                width="100%"
                height="100%">
              </iframe>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
