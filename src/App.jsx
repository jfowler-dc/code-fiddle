import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Result from './components/Result';

function App() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);

  const [srcDoc, setSrcDoc] = useState('');
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [js, setJs] = useState('')

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
      const htmlValue = htmlEditor.getValue();
      const cssValue = cssEditor.getValue();
      const jsValue = jsEditor.getValue();

      setHtml(htmlValue)
      setCss(cssValue)
      setJs(jsValue)

      let htmlSrc = `
        <html>
          <head>
            <style>${cssEditor.getValue()}</style>
          </head>
          <body>${htmlEditor.getValue()}</body>
          <script>${jsEditor.getValue()}<\/script>
        </html>
      `
      setSrcDoc(htmlSrc);
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
          <span className="material-symbols-outlined">
          terminal
          </span>
          <h1>codeFiddle</h1>
        </div>
        <div className="cf-user-icon">

        </div>
      </header>

      <div className="cf-editor-container">
        <div className="cf-editor-container-section">
          <Editor className="" title="HTML" editorRef={htmlEditorRef} data={html} />
          <Editor title="CSS" editorRef={cssEditorRef} data={css} />
        </div>
        <div className="cf-editor-container-section">
          <Editor title="ECMAScript" editorRef={jsEditorRef} data={js} />
          <Result title="Result" srcDoc={srcDoc} />
        </div>
      </div>

    </div>
  );
}

export default App;
