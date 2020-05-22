import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core.js';
import 'prismjs/components/prism-clike.js';
import 'prismjs/components/prism-javascript.js';
import './prism.css';

const code = `console.log("sd")`;

class ScriptEditor extends React.Component {
  state = { code };

  render() {
    return (
      <div className="container_editor_area">
        <p className="test">haha</p>

        <Editor
          placeholder="Type some code…"
          value={this.state.code}
          onValueChange={code => this.setState({ code })}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          className="container__editor"
        />

<style global jsx>{`
        

        /* Syntax highlighting */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: red;
        }
        .token.punctuation {
          color: red;
        }
        
        .token.property,
        .token.tag,
        .token.boolean,
        .token.number,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #e91e63;
        }
        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #4caf50;
        }
        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string {
          color: #795548;
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
          color: #ff9800;
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
}

ScriptEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default ScriptEditor;
