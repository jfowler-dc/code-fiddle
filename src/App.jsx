import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const htmlEditor = monaco.editor.create(htmlEditorRef.current, {
      value: '',
      language: 'html',
      theme: 'vs-dark',
    });

    const cssEditor = monaco.editor.create(cssEditorRef.current, {
      value: '',
      language: 'css',
      theme: 'vs-dark',
    });

    const jsEditor = monaco.editor.create(jsEditorRef.current, {
      value: '',
      language: 'javascript',
      theme: 'vs-dark',
    });

    const updatePreview = () => {
      const html = htmlEditor.getValue();
      const css = `<style>${cssEditor.getValue()}</style>`;
      const js = `<script>${jsEditor.getValue()}<\/script>`;
      setSrcDoc(`<html><head>${css}</head><body>${html}</body>${js}</html>`);
      console.log(html.toString())
      console.log(css.toString())
      console.log(js.toString())
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
      <h1>JSFiddle Clone</h1>
      <div className="editors">
        <div className="editor-container">
          <h2>HTML</h2>
          <div ref={htmlEditorRef} className="editor"></div>
        </div>
        <div className="editor-container">
          <h2>CSS</h2>
          <div ref={cssEditorRef} className="editor"></div>
        </div>
        <div className="editor-container">
          <h2>Javascript</h2>
          <div ref={jsEditorRef} className="editor"></div>
        </div>
      </div>
      <div className='result-container'>
        <h2>Result</h2>

        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          width="100%"
          height="300px"
        ></iframe>
      </div>
    </div>
  );
}

export default App;
