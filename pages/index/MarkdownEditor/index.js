import React, { useEffect } from "react";
import PropTypes from "prop-types";
import rdmd from '@readme/markdown';

import css from "./style.css";

const savingRate = process.env.savingRate;

function MarkdownEditor({ file, write }) {

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
        type: "text/markdown",
        lastModified: new Date()
      }
    );

    write(newFile);

  }

  const onFileChange = (event) => {

    const input = event.target.value;

    setContent(input);
    clearTimeout(time);
    setTime(setTimeout(() => {
      updateFiles(input);
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
    <div>
      <h3>{file.name}</h3>
      <p style={{ 'color': 'blue' }}>{save ? 'Saved!' : 'Writing...'}</p>
      <textarea className={css.editor} value={content} rows={20} onChange={onFileChange} onBlur={onExit}></textarea>
      <div className={css.preview}>
        <div className={css.content}>{rdmd(content)}</div>
      </div>
    </div>
  );

}

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default MarkdownEditor;
