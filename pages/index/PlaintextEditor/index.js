import React, {useEffect} from "react";
import PropTypes from "prop-types";

import css from "./style.css";

function PlaintextEditor({ file, write }) {

  const [content, setContent] = React.useState('');

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  }, [file]);

  const onFileChange = (event) => {
    setContent(event.target.value);
  }

  return (
    <div>
      <h3>{file.name}</h3>
      <textarea className={css.editor} value={content} rows={20} onChange={onFileChange}></textarea>
    </div>
  );

}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
