import React, { ReactElement } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer, ReadyState } from "react-relay";
import { serverUri } from "../data/remoteFiles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { LinkQRCode } from "./LinkQRCode";
import { UploadFile } from "./UploadFile";
import environment from "../../graph-api/environment";

const UploadFormContainer = styled(Paper)`
  padding: 10px 50px;
`;

const FilePaper = styled(Paper)`
  padding: 20px;
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

interface File {
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
        <Grid container spacing={24}>
          <QueryRenderer
            environment={environment}
            query={filesQuery}
            variables={variables}
            render={this.renderGamesFiles}
          />
        </Grid>
      </div>
    );
  }

  renderGamesFiles = (readyState: ReadyState<FilesQueryResult>): ReactElement<any> => {
    if (readyState.props) {
      return <>{readyState.props.files.map((value: File) => this.renderFileMeta({ serverUri, ...value }))}</>;
    }
    return null;
  };

  handleFileUploaded = () => {
    this.setState({ variables: { seed: Math.random() } });
  };

  renderFileMeta = ({ serverUri, relativePath, filename }): ReactElement<any> => {
    const fileUri = `${serverUri}/${relativePath}${filename}`;
    return (
      <Grid item xs={6} key={filename}>
        <FilePaper>
          <Chip color="primary" label={filename} />
          <div>
            <LinkQRCode fileUri={fileUri} />
          </div>
        </FilePaper>
      </Grid>
    );
  };
}
