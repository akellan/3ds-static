import React, { ReactElement } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer, ReadyState } from "react-relay";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { UploadFile } from "./UploadFile";
import environment from "../../graph-api/environment";
import { ErrorMessage } from "../../error-handling";
import FilesGrid from "./FilesGrid";

const UploadFormContainer = styled(Paper)`
  padding: 10px 50px;
`;

const filesQuery = graphql`
  query GamesList2Query {
    files {
      filename
      relativePath
    }
  }
`;

interface FilesQueryResult {
  files: File[];
}

export interface File {
  filename: string;
  relativePath: string;
}

interface FilesListState {
  variables: { seed: number };
}

export class FilesList extends React.Component<{}, FilesListState> {
  state = { variables: { seed: Math.random() } };

  render() {
    const { variables } = this.state;
    return (
      <div>
        <div>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <UploadFormContainer>
                <UploadFile onFileUploaded={this.handleFileUploaded} />
              </UploadFormContainer>
            </Grid>
          </Grid>
        </div>
        <div />
        <QueryRenderer
          environment={environment}
          query={filesQuery}
          variables={variables}
          render={this.renderGamesFiles}
        />
      </div>
    );
  }

  renderGamesFiles = (readyState: ReadyState<FilesQueryResult>): ReactElement<any> => {
    const { error, props } = readyState;
    if (error) {
      return this.renderError(error);
    }

    if (props) {
      return <FilesGrid files={props.files} />;
    }

    return null;
  };

  handleFileUploaded = () => {
    this.setState({ variables: { seed: Math.random() } });
  };

  renderError = (error: Error) => {
    return (
      <Grid item xs={12}>
        <ErrorMessage error={error} />
      </Grid>
    );
  };
}
