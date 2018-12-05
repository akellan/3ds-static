import React, { ReactElement } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer, ReadyState } from "react-relay";
import { fetchGamesFilesList } from "./gamesFiles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { LinkQRCode } from "./LinkQRCode";
import { UploadFile } from "./UploadFile";
import environment from "../graph-api/environment";
import { Variables } from "relay-runtime";

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

export class GamesList2 extends React.Component {
  state = { files: null };

  render() {
    const { files } = this.state;

    if (!files) {
      return "Loading";
    }
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
          <QueryRenderer environment={environment} query={query} variables={{}} render={this.renderGamesFiles} />
          {files.map(this.renderFileMeta)}
        </Grid>
      </div>
    );
  }

  async componentDidMount() {
    await this.refreshGamesList();
  }

  renderGamesFiles = (readyState: ReadyState<Variables>): ReactElement<any> => {
    console.log(readyState.error);
    console.log(readyState.props);
    return <div>test</div>;
  };

  refreshGamesList = async () => {
    const files = await fetchGamesFilesList();
    this.setState({ files });
  };

  handleFileUploaded = async () => {
    await this.refreshGamesList();
  };

  renderFileMeta = ({ serverUri, relativePath, filename }) => {
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
