import React, { ReactElement } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer, ReadyState, createRefetchContainer, RelayRefetchProp } from "react-relay";
import { serverUri } from "./gamesFiles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { LinkQRCode } from "./LinkQRCode";
import { UploadFile } from "./UploadFile";
import environment from "../graph-api/environment";

const UploadFormContainer = styled(Paper)`
  padding: 10px 50px;
`;

const GamePaper = styled(Paper)`
  padding: 20px;
`;

const query = graphql`
  query GamesList2Query {
    files {
      filename
      relativePath
    }
  }
`;

interface QueryVariables {
  files: File[];
}

interface File {
  filename: string;
  relativePath: string;
}

interface GamesList2State {
  queryDefaults: QueryVariables;
}

export class GamesList2 extends React.Component {
  render() {
    const variables = { idr: Math.random() };
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
          <QueryRenderer environment={environment} query={query} variables={variables} render={this.renderGamesFiles} />
        </Grid>
      </div>
    );
  }

  renderGamesFiles = (readyState: ReadyState<QueryVariables>): ReactElement<any> => {
    console.log(readyState);
    if (readyState.props) {
      return <>{readyState.props.files.map((value: File) => this.renderFileMeta({ serverUri, ...value }))}</>;
    }
    return null;
  };

  handleFileUploaded = () => {
    this.forceUpdate();
  };

  renderFileMeta = ({ serverUri, relativePath, filename }): ReactElement<any> => {
    const fileUri = `${serverUri}/${relativePath}${filename}`;
    return (
      <Grid item xs={6} key={filename}>
        <GamePaper>
          <Chip color="primary" label={filename} />
          <div>
            <LinkQRCode fileUri={fileUri} />
          </div>
        </GamePaper>
      </Grid>
    );
  };
}
