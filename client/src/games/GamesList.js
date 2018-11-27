import React from "react";
import { fetchGamesFilesList } from "./gamesFiles";

export class GamesList extends React.Component {
  state = { files: null };

  render() {
    const { files } = this.state;

    if (!files) {
      return "Loading";
    }
    return <ul>{files.map(this.renderFile)}</ul>;
  }

  async componentDidMount() {
    const response = await fetchGamesFilesList();
    const files = await response.json();
    this.setState({ files });
  }

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
