import React from "react";

export const LinkQRCode = function(props) {
  return <img alt="barcode" src={`http://chart.apis.google.com/chart?cht=qr&chs=300x300&chl=` + props.fileUri} />;
};
