import React from "react";
import { fetchGamesFilesList, uploadFile } from "./gamesFiles";

export class GamesList extends React.Component {
  state = { files: null, fileForUpload: null };

  render() {
    const { files } = this.state;

    if (!files) {
      return "Loading";
    }
    return (
      <div>
        <div>
          <form onSubmit={this.uploadGame}>
            <input name="game" type="file" onChange={this.fileChanged} />
            <input type="submit" onSubmit={this.uploadGame} />
          </form>
        </div>
        <ul>{files.map(this.renderFile)}</ul>
      </div>
    );
  }

  async componentDidMount() {
    const files = await fetchGamesFilesList();
    this.setState({ files });
  }

  fileChanged = event => {
    this.setState({ fileForUpload: event.currentTarget.files[0] });
  };

  uploadGame = event => {
    uploadFile(this.state.fileForUpload);
    event.currentTarget.reset();
    event.preventDefault();
  };

  renderFile = fileUri => (
    <li key={fileUri}>
      <span>{fileUri}</span>
      <img
        alt="barcode"
        src={
          `http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=` + fileUri
        }
      />
    </li>
  );
}
