import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core.js';
import './node_modules/prismjs/components/prism-clike.js.js';
import './node_modules/prismjs/components/prism-javascript.js.js';
import css from './style.css';

function ScriptEditor({ file, write }) {


  const [content, setContent] = React.useState('');

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  }, [file]);

  const onFileChange = (code) => {
    const input = event.target.value;
    setContent(code);

  }

  const onExit = (event) => {
    const newFile = new File(
      [content],
      file.name,
      {
        type: "text/javascript",
        lastModified: new Date()
      }
    );
    write(newFile);
  }

  return (
    <div className={css.editor}>
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
