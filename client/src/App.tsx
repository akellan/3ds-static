import React, { Component } from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import { createGlobalStyle } from "styled-components";
import { FilesList } from "./files";

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  insertionPoint: document.getElementById("jss-insertion-point")
});

const RootStyle = createGlobalStyle`
  body {
    padding: 0;
  }
`;
class App extends Component {
  render() {
    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <>
          <RootStyle />
          <FilesList />
        </>
      </JssProvider>
    );
  }
}

export default App;
