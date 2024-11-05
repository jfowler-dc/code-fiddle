import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Editor from './components/Editor';
import Result from './components/Result';

function App() {
  const htmlEditorRef = useRef(null);
  const cssEditorRef = useRef(null);
  const jsEditorRef = useRef(null);

  const [hideResults, setHideResults] = useState(false)
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

    const localHtml = localStorage.getItem("codeFiddleHtml")
    if (localHtml) {
      setHtml(localHtml)
    }

    const htmlEditor = monaco.editor.create(htmlEditorRef.current, {
      ...defaultSettings,
      ...{language: 'html', value: localHtml ? localHtml : html}
    });

    const localCss = localStorage.getItem("codeFiddleCss")
    if (localCss) {
      setCss(localCss)
    }

    const cssEditor = monaco.editor.create(cssEditorRef.current, {
      ...defaultSettings,
      ...{language: 'css', value: localCss ? localCss : css}
    });

    const localJs = localStorage.getItem("codeFiddleJs")
    if (localJs) {
      setJs(localJs)
    }

    const jsEditor = monaco.editor.create(jsEditorRef.current, {
      ...defaultSettings,
      ...{language: 'javascript', value: localJs ? localJs : js}
    });

    function htmlSrcTemplate(html, css, js) {
      let htmlSrc = `
        <html>
          <head>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html}
          </body>
          <script>
            ${js}
          <\/script>
        </html>
      `
      return htmlSrc
    }

    if (localHtml || localCss || localJs) {
      const htmlSrc = htmlSrcTemplate(localHtml, localCss, localJs)
      setSrcDoc(htmlSrc)
    }

    const updatePreview = () => {
      const htmlValue = htmlEditor.getValue();
      const cssValue = cssEditor.getValue();
      const jsValue = jsEditor.getValue();
      const htmlSrc = htmlSrcTemplate(htmlValue, cssValue, jsValue)

      setHtml(htmlValue)
      setCss(cssValue)
      setJs(jsValue)
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

  function hideResultsWindow(bool) {
    setHideResults(bool)
  }

  let hideResultsClass = ''
  if (hideResults == true) {
    hideResultsClass = 'cf-hide-section'
  }

  return (
    <div className="App">

      <AppHeader html={html} css={css} js={js} />

      <div className="cf-editor-container">
        <div className="cf-editor-container-section">
          <Editor title="HTML" editorRef={htmlEditorRef} data={html} />
          <Editor title="CSS" editorRef={cssEditorRef} data={css} />
        </div>
        <div className={hideResultsClass + ' cf-editor-container-section'}>
          <Editor title="ECMAScript" editorRef={jsEditorRef} data={js} />
          <Result title="Result" srcDoc={srcDoc} hideResultsWindow={hideResultsWindow} />
        </div>
      </div>

    </div>
  );
}

export default App;
