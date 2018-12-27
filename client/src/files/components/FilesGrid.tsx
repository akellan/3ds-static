import React, { Component, ReactElement } from "react";
import { serverUri } from "../data/remoteFiles";
import { Grid } from "@material-ui/core";
import { File } from "./FilesList";
import { FileMetadata } from "./FileMetadata";

interface FilesGridProps {
  files: File[];
}

export default class FilesGrid extends Component<FilesGridProps> {
  public render() {
    const { files } = this.props;
    return (
      <Grid container spacing={24}>
        {files.map(this.renderFileMeta)}
      </Grid>
    );
  }

  renderFileMeta = ({ relativePath, filename }): ReactElement<any> => {
    const fileUri = `${serverUri}/${relativePath}${filename}`;
    return (
      <Grid item xs={6} key={filename}>
        <FileMetadata filename={filename} fileUri={fileUri} />
      </Grid>
    );
  };
}
