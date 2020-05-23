import React, { useEffect } from "react";
import PropTypes from "prop-types";

import css from "./style.css";

const savingRate = process.env.savingRate;

function PlaintextEditor({ file, write }) {

  const [content, setContent] = React.useState('');
  const [time, setTime] = React.useState(null);
  const [save, setSave] = React.useState(true);
  const [textSize, setTextSize] = React.useState()

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
        type: "text/plain",
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

  const onSizeChange = (event) => {
    const input = event.target.value;
    console.log(input)
    setTextSize(input);
  }

  return (
    <div>
      <h3>{file.name}</h3>
      <div className={css.tool}>
      <p style={{'color':'blue'}}>{save? 'Saved!': 'Writing...'}</p>
      <input type="range" min={15} max={25} defaultValue={15} onChange={onSizeChange} />
      </div>
      <textarea className={css.editor} value={content} rows={20} onChange={onFileChange} onBlur={onExit} style={{'fontSize': `${textSize}px`}} ></textarea>
    </div>
  );

}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
