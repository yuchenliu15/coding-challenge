import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core.js';

import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript.js';
import css from './style.css';

const savingRate = process.env.savingRate;

function ScriptEditor({ file, write }) {

  const [content, setContent] = React.useState('');
  const [time, setTime] = React.useState(null);
  const [save, setSave] = React.useState(true);

  useEffect(() => {
    (async () => {
      setContent(await file.text());
      setSave(true);
    })();
  }, [file]);

  const updateFiles = (input) => {

    const newFile = new File(
      [input],
      file.name,
      {
        type: "text/javascript",
        lastModified: new Date()
      }
    );

    write(newFile);

  }

  const onFileChange = (code) => {

    setContent(code);
    clearTimeout(time);
    setTime(setTimeout(() => {
      updateFiles(code);
    }, savingRate));

    if (save)
      setSave(false);

  }

  const onExit = (event) => {

    const input = event.target.value;

    clearTimeout(time);
    updateFiles(input);

  }

  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      <p style={{ 'color': 'blue' }}>{save ? 'Saved!' : 'Writing...'}</p>
      <Editor
        placeholder="Type some code…"
        value={content}
        onValueChange={onFileChange}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        className="container__editor"
        onBlur={onExit}
      />

      <style global jsx>{`
        

        /* Syntax highlighting */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #20bf6b;
        }
        .token.punctuation {
          color: black;
        }
        
        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #FDA7DF;
        }
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #fa8231;
        }
        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #006266;
        }
        .token.atrule,
        .token.attr-value,
        .token.keyword {
          color: #3f51b5;
        }
        .token.function {
          color: #f44336;
        }
        .token.regex,
        .token.important,
        .token.variable {
          color: #1289A7;
        }
        .token.important,
        .token.bold {
          font-weight: bold;
        }
        .token.italic {
          font-style: italic;
        }
        .token.entity {
          cursor: help;
        }
      `}</style>
    </div>

  );

}

ScriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default ScriptEditor;
