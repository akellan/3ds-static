import React from "react";

export const LinkQRCode: React.FunctionComponent<{ fileUri: string }> = props => (
  <img alt="barcode" src={`http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=` + props.fileUri} />
);
