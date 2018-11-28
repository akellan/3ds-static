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
  margin: 0 20px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

export class UploadFile extends React.Component {
  fileRef = React.createRef();

  state = { isUploading: false };

  static propTypes = {
    onFileUploaded: PropTypes.func
  };

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
          <FormButton type="submit" variant="contained" color="primary">
            Submit
          </FormButton>
          {isUploading && <CircularProgress size={30} thickness={5} />}
        </Form>
      </>
    );
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { target } = event;

    const { files } = this.fileRef.current;

    if (files.length) {
      this.setState({ isUploading: true });

      await uploadFile(files[0]);
      this.props.onFileUploaded();
      target.reset();

      this.setState({ isUploading: false });
    }
  };
}
