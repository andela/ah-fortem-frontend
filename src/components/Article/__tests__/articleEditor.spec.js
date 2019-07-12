import React from "react";
import { shallow } from "enzyme";
import * as Draft from "draft-js";

import { findByTestAttr } from "../../../testutils";

import {
  ArticleEditor,
  convert,
  getBlockStyle,
  StyleButton,
  BlockStyleControls,
  InlineStyleControls
} from "../ArticleEditor";

const { EditorState } = Draft;

const testRender = type => {
  const content = EditorState.createWithContent(convert("Hello Here"));
  let wrap;
  let num;
  if (type === "block") {
    wrap = shallow(<BlockStyleControls editorState={content} />);
    num = 10;
  } else {
    wrap = shallow(<InlineStyleControls editorState={content} />);
    num = 4;
  }
  expect(wrap.find(StyleButton).length).toBe(num);
};

const setUp = (props = {}) => shallow(<ArticleEditor {...props} />);
const body = "Lets all breathe fire and fly";
describe("test convert fn", () => {
  test("should return a Draftjs p tag when content comes as a string", () => {
    expect(JSON.stringify(convert(body).blockMap)).toContain(body);
  });
  test("should convert Draftjs Stringified content to draftjs", () => {
    const bodyparam = JSON.stringify(convert(body));
    const parsedcontent = convert(bodyparam);
    expect(JSON.stringify(parsedcontent)).toContain(body);
  });
});

describe("<ArticleEditor /> editor on preview", () => {
  test("should render <ArticleEditor /> with the draftjs content as the editorState", () => {
    const draftjsBody = JSON.stringify(convert(body));
    const wrapper = setUp({ body: draftjsBody });
    const editorState = wrapper.state().editorState;
    expect(JSON.stringify(editorState)).toContain(body);
  });
  test("should render <ArticleEditor /> with the draftjs blank content as the editorState", () => {
    const wrapper = setUp({});

    const editorState = wrapper.state().editorState;
    expect(JSON.stringify(editorState)).toContain(JSON.stringify("text"));
  });
});

describe("<Article /> on edit mode", () => {
  test("should render editing controls without error", () => {
    const wrapper = setUp({ edit: true });
    const edittingContainer = findByTestAttr(wrapper, "article-edit-controls");
    expect(edittingContainer.exists()).toBe(true);
  });
});

describe("getBlockStyle fn() tests", () => {
  const getTypeFunction = type => ({
    getType: () => type
  });
  test("should return special classname for blockquote type", () => {
    const block = {
      ...getTypeFunction("blockquote")
    };
    const blockStyle = getBlockStyle(block);
    expect(blockStyle).toEqual("RichEditor-blockquote");
  });
  test("should return null for other types", () => {
    const block = {
      ...getTypeFunction("h3")
    };
    const blockStyle = getBlockStyle(block);
    expect(blockStyle).toBe(null);
  });
});

describe("<StyleButton />", () => {
  const stylesButton = (props = {}) => shallow(<StyleButton {...props} />);
  test("should render without error ", () => {
    const stylesButtonWrapper = stylesButton();
    const button = findByTestAttr(stylesButtonWrapper, "single-style-button");
    expect(button.props().className).toBe("RichEditor-styleButton");
  });
  test("should add the active class when active prop is true", () => {
    const stylesButtonWrapper = stylesButton({ active: true });
    const button = findByTestAttr(stylesButtonWrapper, "single-style-button");
    expect(button.props().className).toBe(
      "RichEditor-styleButton RichEditor-activeButton"
    );
  });
  test("should call onToggle with props.style", () => {
    const onToggle = jest.fn();
    const style = "header-one";
    const stylesButtonWrapper = stylesButton({ onToggle, style });
    const button = findByTestAttr(stylesButtonWrapper, "single-style-button");
    button.simulate("mouseDown", {
      preventDefault: jest.fn()
    });

    expect(onToggle).toBeCalledWith(style);
  });
});

describe("<BlockStyleControls /> tests", () => {
  test("should render without errors", () => {
    testRender("block");
  });
});

describe("<InlineStyleControls /> tests", () => {
  test("should render InlineStyleControls without error", () => {
    testRender("inline");
  });
});

describe("<ArticleEditor /> functions", () => {
  const content = EditorState.createWithContent(convert("Hello Here"));
  const getDraftJSContent = jest.fn();
  const newContent = EditorState.createWithContent(
    convert("Hello Here New State")
  );
  const wrap = shallow(
    <ArticleEditor
      edit={true}
      editorState={content}
      getDraftJSContent={getDraftJSContent}
    />
  );

  const draftFunc = type => {
    Draft.RichUtils.onTab = jest.fn(() => newContent);
    if (type === "inline") {
      Draft.RichUtils.toggleInlineStyle = jest.fn(() => content);
    } else {
      Draft.RichUtils.toggleBlockType = jest.fn(() => content);
    }
  };

  test("should call getDraftJSContent when onChange is called", () => {
    wrap.instance().onChange(newContent);
    expect(getDraftJSContent).toHaveBeenCalled();
  });

  test(" _handleKeyCommand should return true if newState returns content", () => {
    Draft.RichUtils.handleKeyCommand = jest.fn(() => content);
    const wrapper = shallow(<ArticleEditor />);
    expect(wrapper.instance()._handleKeyCommand("command", content)).toBe(true);
  });
  test(" _handleKeyCommand should return false if newState is false", () => {
    Draft.RichUtils.handleKeyCommand = jest.fn(() => false);
    const wrapper = shallow(<ArticleEditor />);
    expect(wrapper.instance()._handleKeyCommand("command", "content")).toBe(
      false
    );
  });
  test("_mapKeyToEditorCommand should be called with", () => {
    Draft.RichUtils.onTab = jest.fn(() => newContent);

    wrap.instance()._mapKeyToEditorCommand({
      keyCode: 9
    });
    expect(getDraftJSContent).toHaveBeenCalled();
  });
  test("getDefaultKeyBinding should be called when _mapKeyToEditorCommand", () => {
    const getDraftJSContent = jest.fn();
    Draft.RichUtils.onTab = jest.fn(() => newContent);
    wrap.instance()._mapKeyToEditorCommand({
      keyCode: 12
    });
    expect(getDraftJSContent).not.toHaveBeenCalled();
  });
  test("_toggleBlockType should call this.onChange", () => {
    draftFunc("block");

    wrap.instance()._toggleBlockType(content);
    expect(Draft.RichUtils.toggleBlockType).toHaveBeenCalled();
  });
  test("_toggleInlineStyle should call this.onChange", () => {
    draftFunc("inline");

    wrap.instance()._toggleInlineStyle(content);
    expect(Draft.RichUtils.toggleInlineStyle).toHaveBeenCalled();
  });
});
