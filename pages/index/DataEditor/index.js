import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import css from './style.css';
import dynamic from 'next/dynamic'

// use the component in your app!
function DataEditor({ file, write }) {

  const [content, setContent] = React.useState({});
  const [object, setObject] = React.useState({});
  const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false });

  useEffect(() => {
    (async () => {
      const data = await file.text();
      const json = JSON.parse(data);
      setContent(json);
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
      <DynamicReactJson src={content}></DynamicReactJson>
    </div>
  );
}

DataEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func
};

export default DataEditor;
