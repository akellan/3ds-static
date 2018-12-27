import React, { PureComponent, Component } from "react";
import styled from "styled-components";
import { Paper, Chip } from "@material-ui/core";
import { LinkQRCode } from "./LinkQRCode";

const FilePaper = styled(Paper)`
  padding: 20px;
`;

interface FileMetadataProps {
  filename: string;
  fileUri: string;
}

export class FileMetadata extends Component<FileMetadataProps> {
  public render() {
    const { filename, fileUri } = this.props;
    return (
      <FilePaper>
        <Chip color="primary" label={filename} />
        <div>
          <LinkQRCode fileUri={fileUri} />
        </div>
      </FilePaper>
    );
  }
}
