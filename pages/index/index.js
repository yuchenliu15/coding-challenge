import React, { useState, useEffect } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import path from "path";
import classNames from "classnames";
import { CookiesProvider, useCookies } from 'react-cookie';
import { listFiles } from "./list-files";

import MarkdownEditor from "./MarkdownEditor";
import PlaintextEditor from "./PlaintextEditor";
import ScriptEditor from "./ScriptEditor";
import DataEditor from "./DataEditor";


import IconPlaintextSVG from "./assets/icon-plaintext.svg";
import IconMarkdownSVG from "./assets/icon-markdown.svg";
import IconJavaScriptSVG from "./assets/icon-javascript.svg";
import IconJSONSVG from "./assets/icon-json.svg";

import css from "./style.css";

const TYPE_TO_ICON = {
  "text/plain": IconPlaintextSVG,
  "text/markdown": IconMarkdownSVG,
  "text/javascript": IconJavaScriptSVG,
  "application/json": IconJSONSVG
};

const EXTENSION_TO_TYPE = {
  ".txt": "text/plain",
  ".md": "text/markdown",
  ".js": "text/javascript",
  ".json": "application/json"
}

// left menu
function FilesTable({ files, activeFile, setActiveFile }) {
  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {files.map(file => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ""
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type]
                  }}
                ></div>
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func
};

// right window
function Previewer({ file }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    (async () => {
      setValue(await file.text());
    })();
  }, [file]);

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>
      <div className={css.content}>{value}</div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object
};

// Uncomment keys to register editors for media types
const REGISTERED_EDITORS = {
  "text/plain": PlaintextEditor,
  "text/markdown": MarkdownEditor,
  "text/javascript": ScriptEditor,
  "application/json": DataEditor
};

function PlaintextFilesChallenge() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['files']);

  useEffect(() => {
    const regex = /[.][a-z]*/;
    const files = cookies.files? cookies.files.map(item => {
      return new File(
        [item.content],
        item.name,
        {
          type: EXTENSION_TO_TYPE[item.name.match(regex)],
          lastModified: new Date()
        }
      )
    }): listFiles();
    setFiles(files);
  }, []);

  const fileForEach = async (items) => {
    const list = [];
    for(let index = 0; index < items.length; index++) {
      list.push({
        name: items[index].name,
        content: await items[index].text()
      });
    }
    return list;
  }

  const write = file => {
    console.log("Writing... ", file.name);
    // TODO: Write the file to the `files` array in state\

    const newFiles = [...files];
    const currentFileIndex = newFiles.indexOf(activeFile);
    newFiles.splice(currentFileIndex, 1, file);
    setFiles(newFiles);
    setActiveFile(file);
    fileForEach(newFiles)
      .then(newFilesCookie=> {
        setCookie('files', JSON.stringify(newFilesCookie), {path: '/'});
      });
  };

  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <Head>
        <title>Rethink Engineering Challenge</title>
      </Head>
      <aside>
        <header>
          <div className={css.tagline}>Rethink Engineering Challenge</div>
          <h1>Plaintext: Why So Plain</h1>
          <div className={css.description}>
            Let{"'"}s have fun with files and JavaScript. What could be more fun
            than rendering and editing plaintext? Not much, as it turns out.
          </div>
          <div>
            <form style={{'marginBottom': '0'}}>
              <input type="checkbox" name="checkbox1" checked readOnly/>
              <label> auto save, set to 2 seconds after the typing stops</label><br/>
              <input type="checkbox" name="checkbox1" checked readOnly/>
              <label > saves across reloads</label><br/>
            </form>
          </div>
        </header>

        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer>
          <div className={css.link}>
            <a href="https://rethink.software">Rethink Software</a>
            &nbsp;—&nbsp;Frontend Engineering Challenge
          </div>
          <div className={css.link}>
            Questions? Feedback? Email{" "}
            <a href="mailto:will@rethink.software">will@rethink.software</a>
          </div>
        </footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

const App = () => {
  return (
    <CookiesProvider>
      <PlaintextFilesChallenge></PlaintextFilesChallenge>
    </CookiesProvider>
  )
}

export default App;
