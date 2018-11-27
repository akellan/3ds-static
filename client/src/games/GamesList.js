import React from "react";
import { fetchGamesFilesList } from "./gamesFiles";

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
          <form action="/static" method="post" enctype="multipart/form-data">
            <input name="game" type="file" />
            <input type="submit" />
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
