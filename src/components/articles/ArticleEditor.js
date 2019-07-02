import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";

export class ArticleEditor extends Component {
  render() {
    return (
      <div>
        <h1>Draft.js Editor</h1>
        <div className="editor">
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default ArticleEditor;
