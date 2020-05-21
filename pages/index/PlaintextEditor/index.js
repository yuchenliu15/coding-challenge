import React, {useEffect} from "react";
import PropTypes from "prop-types";

import css from "./style.css";

function PlaintextEditor({ file, write }) {

  const [content, setContent] = React.useState('');

  useEffect(() => {
    (async () => {
      setContent(await file.text());
    })();
  });

  console.log(file, write);
  return (
    <div className={css.editor}>
      <h3>{file.name}</h3>
      <p>{content}</p>
    </div>
  );

}

PlaintextEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default PlaintextEditor;
