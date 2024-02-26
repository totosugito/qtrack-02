import React from 'react';
import PropTypes from 'prop-types';
import 'quill/dist/quill.snow.css';

const propTypes = {
  content: PropTypes.string.isRequired,
};

const QuillViewer = ({ content, ...otherProps }) => (
  <div className="ql-snow">
    <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} {...otherProps} style={{marginLeft: '-12px', marginTop: '-12px'}}/>
  </div>
);

QuillViewer.propTypes = propTypes;

export default QuillViewer;
