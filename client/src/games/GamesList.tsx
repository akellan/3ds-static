import React from "react";
import { fetchGamesFilesList } from "./gamesFiles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import { LinkQRCode } from "./LinkQRCode";
import { UploadFile } from "./UploadFile";

const UploadFormContainer = styled(Paper)`
  padding: 10px 50px;
`;

const GamePaper = styled(Paper)`
  padding: 20px;
`;

export class GamesList extends React.Component {
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
          {files.map(this.renderFileMeta)}
        </Grid>
      </div>
    );
  }

  async componentDidMount() {
    await this.refreshGamesList();
  }

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
