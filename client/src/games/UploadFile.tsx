import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { uploadFile } from "./gamesFiles";

const Hidden = styled.div`
  display: none;
`;

const FormButton = styled(Button)`
  margin: 0 10px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

export class UploadFile extends React.Component<{ onFileUploaded: () => void }> {
  fileRef = React.createRef<HTMLInputElement>();

  state = { isUploading: false };

  render() {
    const { isUploading } = this.state;
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Hidden>
            <input ref={this.fileRef} id="game-file" name="game" type="file" onChange={this.fileChanged} />
          </Hidden>
          <label htmlFor="game-file">
            <FormButton variant="contained" component="span">
              Upload
            </FormButton>
          </label>
          <FormButton disabled={!this.isFileSelected()} type="submit" variant="contained" color="primary">
            Submit
          </FormButton>
          {isUploading && <CircularProgress size={30} thickness={5} />}
        </Form>
      </>
    );
  }

  fileChanged = () => {
    this.forceUpdate();
  };

  isFileSelected = () => {
    const { current } = this.fileRef;

    if (!current) {
      return false;
    }

    return current.files.length > 0;
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { target } = event;

    const { files } = this.fileRef.current;

    if (this.isFileSelected()) {
      this.setState({ isUploading: true });

      await uploadFile(files[0]);
      this.props.onFileUploaded();
      target.reset();

      this.setState({ isUploading: false });
    }
  };
}
