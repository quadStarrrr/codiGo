import React, { Component } from 'react';

import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

class Collaboration extends Component {
  constructor(props) {
    super(props);
  }
//embed the text editor in this component
  render() {
    return (
      <div>
        <h1>Collaboration</h1>
        <AceEditor
          mode="javascript"
          theme="monokai"
          name="ace"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    )
  }
}

export default Collaboration;